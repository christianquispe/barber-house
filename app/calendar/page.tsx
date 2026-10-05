import { Suspense } from 'react';
import CalendarClient from '@/components/calendar/CalendarClient';

export default function CalendarPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white text-zinc-900">Cargando...</div>}>
      <CalendarClient />
    </Suspense>
  );
}
