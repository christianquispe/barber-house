# Configuración Barber House (Google Calendar Appointment Schedules)

La app usa **Appointment Schedules** (Programación de citas) de Google Calendar.
Cada barbero tiene su propia página de reservas y Google se encarga de la
disponibilidad, la confirmación y el evento en el calendario.

> Importante: la API de Google Calendar **no** permite crear ni leer
> Appointment Schedules. Se crean en la interfaz web de Calendar y solo se
> integran compartiendo/embebiendo su *booking page*. Por eso la app ya no usa
> Supabase ni una service account.

## 1. Crear una Appointment Schedule por barbero

1. Abre [Google Calendar](https://calendar.google.com) en una computadora.
2. Arriba a la izquierda: **Crear → Programación de citas**.
3. Configura título, duración, disponibilidad semanal y ventana de reserva.
4. En **Calendars**, elige el calendario donde caerán las citas.
5. Guarda y abre **Compartir → Copiar enlace de la página de reservas**.
6. Repite por cada barbero.

## 2. Configurar las URLs

Las URLs son públicas (se comparten por WhatsApp), así que se guardan directo en
`lib/barbers.ts`, en el campo `appointmentUrl` de cada barbero. Pega ahí el enlace
copiado en el paso anterior:

```ts
// lib/barbers.ts
{ id: 'b1', name: 'JAVIER.', /* ... */ appointmentUrl: 'https://calendar.app.google/XXXXXXXX' }
```

No se necesitan variables de entorno para las agendas.

## 3. Levantar el proyecto

```bash
pnpm install
pnpm dev
```

- App: http://localhost:3000
- Reservas: http://localhost:3000/calendar

La página `/calendar` embebe la booking page del barbero (`?gv=true`) y también
ofrece un botón para abrirla en una pestaña nueva.

## 4. Personalizar

- Servicios, lookbook y productos: `components/home/HomePage.tsx`.
- Barberos y URLs de agenda: `lib/barbers.ts`.
