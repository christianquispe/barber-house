'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { BARBERS_DATA } from '@/lib/barbers';
import {
  Calendar,
  MapPin,
  Phone,
  Check,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

function toEmbedUrl(url: string) {
  if (!url) return '';
  try {
    const parsed = new URL(url);
    if (!parsed.searchParams.has('gv')) parsed.searchParams.set('gv', 'true');
    return parsed.toString();
  } catch {
    return url;
  }
}

export default function CalendarClient() {
  const searchParams = useSearchParams();
  const paramBarber = searchParams.get('barber');
  const [selectedId, setSelectedId] = useState(
    paramBarber && BARBERS_DATA.some((b) => b.id === paramBarber) ? paramBarber : ''
  );

  const selectedBarber = useMemo(
    () => BARBERS_DATA.find((b) => b.id === selectedId) ?? null,
    [selectedId]
  );

  const embedUrl = selectedBarber ? toEmbedUrl(selectedBarber.appointmentUrl) : '';

  const bookingRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!selectedBarber) return;
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(max-width: 639px)').matches) return;
    bookingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [selectedBarber]);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans antialiased">
      <div className="bg-black text-white text-[11px] font-medium py-2 px-4 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-x-4 gap-y-1">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>Atendiendo Hoy: 10:00 AM - 8:00 PM</span>
            <span className="hidden md:inline-block text-zinc-600">|</span>
            <span className="hidden md:inline-block text-zinc-300"><MapPin className="inline w-3 h-3 mr-1 text-zinc-400" /> Av. Principal 450, Miraflores</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="tel:+51912345678" className="hover:text-zinc-300 transition-colors font-semibold flex items-center gap-1"><Phone className="w-3 h-3" /> +51 912 345 678</a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-zinc-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="group"><Logo /></Link>
            <Link href="/" className="flex items-center gap-2 px-4 py-2 text-xs font-display text-zinc-900 border border-zinc-200 hover:bg-zinc-100 transition-all"><ArrowLeft className="w-3.5 h-3.5" /><span>VOLVER AL INICIO</span></Link>
          </div>
        </div>
      </header>

      <main className="py-6 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 sm:mb-12 text-center">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest block mb-2">Reserva en línea</span>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl text-zinc-900 leading-[0.95] tracking-tighter">AGENDA TU CITA</h1>
            <p className="text-zinc-600 text-sm sm:text-base max-w-2xl mx-auto mt-3 sm:mt-4 leading-relaxed">Elige a tu barbero y reserva directo en su calendario de Google. Verás solo los horarios realmente disponibles.</p>
            <div className="w-12 h-1 bg-black mx-auto mt-4 sm:mt-6"></div>
          </div>

          <section className="space-y-6 sm:space-y-8">
            <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-zinc-200">
              <h2 className="font-display text-xl sm:text-2xl text-zinc-900 flex items-center gap-3"><span className="w-8 h-8 bg-black text-white flex items-center justify-center text-xs font-bold">1</span>Elige a tu barbero</h2>
              {selectedBarber && <span className="text-xs font-semibold text-zinc-600 bg-zinc-100 border border-zinc-200 px-3 py-1">{selectedBarber.name} • {selectedBarber.role}</span>}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {BARBERS_DATA.map((barber) => {
                const isSelected = selectedId === barber.id;
                return (
                  <button
                    key={barber.id}
                    type="button"
                    onClick={() => setSelectedId(barber.id)}
                    aria-pressed={isSelected}
                    className={`w-full flex items-center gap-4 sm:flex-col sm:items-stretch sm:gap-0 text-left border p-4 sm:p-6 transition-all group cursor-pointer ${isSelected ? 'border-black bg-black text-white shadow-lg' : 'border-zinc-200 bg-white hover:border-black'}`}
                  >
                    <div className="relative w-14 h-14 sm:w-full sm:h-auto sm:aspect-[4/5] shrink-0 bg-zinc-900 overflow-hidden rounded-full sm:rounded-none">
                      <img src={barber.img} alt={barber.name} className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500" />
                      <div className="hidden sm:block absolute top-3 right-3 px-2.5 py-1 text-[10px] font-display bg-white text-black">★ {barber.rating}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`text-[10px] font-bold uppercase tracking-widest block truncate ${isSelected ? 'text-zinc-300' : 'text-zinc-400'}`}>{barber.role}</span>
                      <h3 className="font-display text-base sm:text-xl mt-0.5 sm:mt-1">{barber.name}</h3>
                      <p className={`hidden sm:block text-xs font-normal mt-2 leading-relaxed ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>{barber.specialty} ({barber.experience}).</p>
                      <p className={`sm:hidden text-[11px] font-normal mt-0.5 truncate ${isSelected ? 'text-zinc-400' : 'text-zinc-500'}`}>★ {barber.rating} • {barber.specialty}</p>
                    </div>
                    <span className={`sm:hidden shrink-0 w-8 h-8 border flex items-center justify-center ${isSelected ? 'border-white/30 bg-white text-black' : 'border-zinc-200 text-zinc-900'}`}>
                      {isSelected ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </span>
                    <div className={`hidden sm:flex mt-5 py-2.5 text-xs font-display items-center justify-center gap-2 border transition-colors ${isSelected ? 'bg-white text-black border-white' : 'bg-zinc-100 text-zinc-900 border-zinc-200 group-hover:bg-black group-hover:text-white group-hover:border-black'}`}>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                      <span>{isSelected ? 'SELECCIONADO' : 'ELEGIR ' + barber.name.split(' ')[0]}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {selectedBarber && (
            <section ref={bookingRef} className="scroll-mt-24 mt-8 pt-8 sm:mt-12 sm:pt-10 border-t border-zinc-200 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Paso 2</span>
                  <h2 className="font-display text-xl sm:text-2xl text-zinc-900">Elige fecha y horario</h2>
                  <p className="text-zinc-500 text-xs mt-1 leading-relaxed">Reserva de {selectedBarber.name} gestionada por Google Calendar.</p>
                </div>
                {selectedBarber.appointmentUrl && (
                  <a
                    href={selectedBarber.appointmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 text-xs font-display text-zinc-900 border border-zinc-200 hover:bg-black hover:text-white hover:border-black transition-colors flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>ABRIR EN PESTAÑA NUEVA</span>
                  </a>
                )}
              </div>

              {selectedBarber.appointmentUrl ? (
                <div className="border border-zinc-200 bg-zinc-50 p-2 sm:p-3">
                  <iframe
                    src={embedUrl}
                    title={`Agenda de ${selectedBarber.name}`}
                    className="w-full h-[70vh] min-h-[520px] sm:h-[760px] bg-white border-0"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="border border-amber-300 bg-amber-50 p-6 flex items-start gap-4">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-800 leading-relaxed">
                    <p className="font-bold uppercase tracking-wider mb-1">Agenda no configurada</p>
                    <p>Este barbero todavía no tiene una página de reservas de Google Calendar. Crea una <strong>Appointment Schedule</strong> y pega su enlace en <code className="bg-amber-100 px-1">appointmentUrl</code> dentro de <code className="bg-amber-100 px-1">lib/barbers.ts</code>.</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>La disponibilidad y la confirmación se envían automáticamente desde Google Calendar.</span>
              </div>
            </section>
          )}

          {!selectedBarber && (
            <p className="mt-10 text-center text-xs text-zinc-500">Selecciona un barbero para ver su calendario de reservas.</p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 mt-8 sm:pt-10 sm:mt-10 border-t border-zinc-200">
            <Link href="/" className="w-full sm:w-auto px-6 py-4 text-xs font-display text-zinc-900 border border-zinc-200 hover:bg-zinc-100 transition-all flex items-center justify-center gap-2"><ArrowLeft className="w-3.5 h-3.5" /><span>VOLVER AL INICIO</span></Link>
            <Link href="/#servicios" className="w-full sm:w-auto px-8 py-4 text-xs font-display text-white bg-black hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 shadow-md"><span>VER SERVICIOS</span><ArrowRight className="w-3.5 h-3.5" /></Link>
          </div>
        </div>
      </main>
    </div>
  );
}
