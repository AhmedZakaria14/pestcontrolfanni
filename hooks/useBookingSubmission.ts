import { useRef, useState } from 'react';
import type { Booking } from '@/lib/pest-data';

export function useBookingSubmission(locale: string) {
  const pending = useRef(false);
  const bookingId = useRef<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function submit(data: Pick<Booking, 'name' | 'phone' | 'service' | 'area' | 'notes' | 'source'>) {
    if (pending.current) return false;

    pending.current = true;
    setIsSubmitting(true);
    setError('');
    try {
      bookingId.current ??= `book-${crypto.randomUUID()}`;
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, id: bookingId.current }),
      });
      if (!res.ok) throw new Error(`Booking save failed (${res.status})`);
      const result = await res.json();
      if (!result.success || result.id !== bookingId.current) throw new Error('Booking save was not confirmed');
      bookingId.current = undefined;
      return true;
    } catch (err) {
      console.error('Booking submission failed:', err);
      setError(locale === 'en'
        ? 'Your request could not be confirmed. Please try again.'
        : 'تعذّر تأكيد حفظ طلبك. حاول مرة أخرى.');
      return false;
    } finally {
      pending.current = false;
      setIsSubmitting(false);
    }
  }

  return { submit, isSubmitting, error };
}
