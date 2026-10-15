'use client';

import React from 'react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

interface TextRevealProps {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightClass?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

export default function TextReveal({
  text,
  className = '',
  highlightWords = [],
  highlightClass = 'text-[#C7F268]',
  delay = 0,
  as: Component = 'h2',
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });

  // Split into words
  const words = (text || '').split(' ');

  const containerVariants: Record<string, any> = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.035,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Record<string, any> = {
    hidden: {
      y: '100%',
      opacity: 0,
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <Component className={`${className} inline-block`}>
      <motion.span
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="inline-flex flex-wrap gap-x-[0.28em] gap-y-[0.1em]"
      >
        {words.map((word, index) => {
          // Keep Unicode letters (Arabic, English, etc.) and numbers
          const cleanWord = word.replace(/[^\p{L}\p{N}&]/gu, '').trim();
          const isHighlighted = highlightWords.some((hw) => {
            const cleanHw = hw.replace(/[^\p{L}\p{N}&]/gu, '').trim();
            return cleanWord.toLowerCase() === cleanHw.toLowerCase();
          });

          return (
            <span key={index} className="inline-block overflow-hidden py-[0.05em] -my-[0.05em]">
              <motion.span
                variants={wordVariants}
                className={`inline-block ${isHighlighted ? highlightClass : ''}`}
              >
                {word}
              </motion.span>
            </span>
          );
        })}
      </motion.span>
    </Component>
  );
}
