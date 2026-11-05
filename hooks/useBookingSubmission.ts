import { useRef, useState } from 'react';
import { saveBookingToFirestore } from '@/lib/firebase';

export function useBookingSubmission(locale: string) {
  const pending = useRef(false);
  const bookingId = useRef<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function submit(data: Parameters<typeof saveBookingToFirestore>[0]) {
    if (pending.current) return false;

    pending.current = true;
    setIsSubmitting(true);
    setError('');
    try {
      bookingId.current ??= `book-${crypto.randomUUID()}`;
      await saveBookingToFirestore({ ...data, id: bookingId.current });
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
