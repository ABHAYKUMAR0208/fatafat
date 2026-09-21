// Design tokens for the app. Keeping these in one place means the hero,
// the cards below it, and any future screen all pull from the same palette.

export const colors = {
  ink: '#1B1035', // primary dark background / heading text on light surfaces
  paper: '#FFFFFF', // white surface background
  magenta: '#E0166C', // Pink Ride brand accent — used ONLY on the Pink Ride page, kept as-is
  amber: '#FFB238', // legacy accent — kept only for the one Pink Ride gradient that still references it
  secondaryBlue: '#1E9BE0', // secondary accent used everywhere else (was amber) — delivery, active states, icons
  cloud: '#F1F4FA', // neutral cool-gray section background (was lavender)
  textOnDark: '#FFF8F0',
  textMuted: 'rgba(255, 248, 240, 0.72)',
  bodyMutedOnLight: '#6B5C7A',
  chipBg: '#EAF0FE',
  accentBlue: '#3350DE',

  // Booking-card palette (matches the Fatafat-style reference: navy fare card,
  // pink toggle, lavender promise banner, light neutral surfaces)
  navy: '#161F42',
  navySoft: 'rgba(255, 255, 255, 0.14)',
  chartLine: 'rgba(255, 255, 255, 0.55)',
  chartStart: '#5B8DEF',
  chartEnd: '#FFFFFF',
  lavender: '#EEF0FB',
  fieldBg: '#F4F4F8',
  pillBg: '#F1F1F5',
  pillActive: '#161F42',
  border: 'rgba(22, 31, 66, 0.08)',
} as const;

export const gradients = {
  // Matches the Carpool card gradient in components/ServicesGrid.tsx
  carpool: ['#161F42', '#3350DE'] as [string, string],
} as const;

export const fonts = {
  display: 'Sora_700Bold',
  displayMedium: 'Sora_600SemiBold',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
} as const;