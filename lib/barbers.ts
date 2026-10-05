// URLs de reserva públicas de Google Calendar (Appointment Schedules).
// No son secretas: se comparten abiertamente con los clientes por WhatsApp.
export type Barber = {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialty: string;
  img: string;
  rating: string;
  appointmentUrl: string;
};

export const BARBERS_DATA: Barber[] = [
  {
    id: 'b1',
    name: 'JAVIER.',
    role: 'FADE MASTER & VISAGISTA',
    experience: '8 Años de Exp.',
    specialty: 'Desvanecidos Skin Fade & Crop Texturizado',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    rating: '4.9',
    appointmentUrl: 'https://calendar.app.google/BeyZWg91tpNJqEeb9'
  },
  {
    id: 'b2',
    name: 'ALDAIR.',
    role: 'MAESTRO BARBERO & NAVAJA',
    experience: '10 Años de Exp.',
    specialty: 'Rituales de Barba Tradicional & Hot Towel',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    rating: '5.0',
    appointmentUrl: 'https://calendar.app.google/pPopHQu9TPMUuGzH9'
  },
  {
    id: 'b3',
    name: 'JHON.',
    role: 'ESTILISTA EJECUTIVO',
    experience: '6 Años de Exp.',
    specialty: 'Cortes Clásicos en Tijera & Styling',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800',
    rating: '4.8',
    appointmentUrl: 'https://calendar.app.google/iViey8ZmjgcPRQ866'
  },
  {
    id: 'b4',
    name: 'JHON.',
    role: 'ESTILISTA EJECUTIVO',
    experience: '6 Años de Exp.',
    specialty: 'Cortes Clásicos en Tijera & Styling',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800',
    rating: '4.8',
    appointmentUrl: 'https://calendar.app.google/BeyZWg91tpNJqEeb9'
  }
];
