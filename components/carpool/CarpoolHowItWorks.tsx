import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';

const IS_WEB = Platform.OS === 'web';

const BLUE = colors.accentBlue; // '#3350DE' — passenger track
const BLUE_SKY = '#1E9BE0'; // driver track — same family, lighter tone
const BLUE_ICE = colors.chipBg;
const BLUE_SKY_BG = '#E7F5FD';
const BLUE_BORDER = 'rgba(51,80,222,0.18)';
const GLASS_BG = 'rgba(255,255,255,0.66)';
const GLASS_BORDER = 'rgba(255,255,255,0.9)';

type Step = { title: string; description: string };

const PASSENGER_STEPS: Step[] = [
  {
    title: 'Search your route and date',
    description: 'Enter where you\u2019re leaving from, where you\u2019re going, and how many seats you need.',
  },
  {
    title: 'Compare rides already published',
    description:
      'See departure time, driver rating, car, seats left and price per seat \u2014 sorted by time, price or rating.',
  },
  {
    title: 'Book instantly, or request a seat',
    description:
      'Some drivers confirm instantly; others review your request first \u2014 you\u2019re only charged once a seat is confirmed.',
  },
  {
    title: 'No rides yet? Set an alert',
    description:
      'Drivers often publish only a few days ahead. Save your route and we\u2019ll notify you the moment a match goes live.',
  },
];

const DRIVER_STEPS: Step[] = [
  {
    title: 'Verify once',
    description:
      'A one-time check of your driving licence and vehicle RC \u2014 lighter than commercial driver verification, since this is your own car.',
  },
  {
    title: 'Publish your trip',
    description:
      'Add your route, date, seats available and your price per seat \u2014 we show a suggested cost-sharing range as a guide.',
  },
  {
    title: 'Accept automatically, or review requests',
    description: 'Your choice: confirm bookings instantly, or approve each passenger yourself.',
  },
  {
    title: 'Drive, and get paid your price',
    description:
      'Passengers pay in-app. You receive exactly the per-seat price you set \u2014 the platform never marks it up.',
  },
];

function StepColumn({
  icon,
  label,
  steps,
  tone,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  steps: Step[];
  tone: 'deep' | 'sky';
}) {
  const bg = tone === 'deep' ? BLUE_ICE : BLUE_SKY_BG;
  const fg = tone === 'deep' ? BLUE : BLUE_SKY;

  return (
    <View style={styles.stepColumn}>
      <View style={styles.stepColumnHeader}>
        <View style={[styles.stepColumnIcon, { backgroundColor: bg }]}>
          <Ionicons name={icon} size={16} color={fg} />
        </View>
        <Text style={styles.stepColumnLabel}>{label}</Text>
      </View>

      {steps.map((step, i) => (
        <View key={step.title} style={styles.stepCard}>
          <View style={[styles.stepNumber, { backgroundColor: bg }]}>
            <Text style={[styles.stepNumberText, { color: fg }]}>{i + 1}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepDescription}>{step.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

export default function CarpoolHowItWorks({ isDesktop }: { isDesktop: boolean }) {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Ionicons name="git-network-outline" size={13} color={BLUE} />
          <Text style={styles.badgeLabel}>How It Works</Text>
        </View>
        <Text style={styles.heading}>
          Book a seat, <Text style={styles.headingAccent}>or publish your own trip.</Text>
        </Text>
        <Text style={styles.lead}>
          Carpool works both ways — inside the same app, no separate sign-up.
        </Text>
      </View>

      <View style={[styles.stepGrid, !isDesktop && styles.stepGridStacked]}>
        <StepColumn icon="person-outline" label="As a passenger" steps={PASSENGER_STEPS} tone="deep" />
        <StepColumn icon="car-outline" label="As a driver" steps={DRIVER_STEPS} tone="sky" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 24, paddingVertical: 48, maxWidth: 1200, width: '100%', alignSelf: 'center' },

  header: { alignItems: 'center', maxWidth: 620, alignSelf: 'center', marginBottom: 40 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 8,
    backgroundColor: BLUE_ICE,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: BLUE_BORDER,
  },
  badgeLabel: { fontFamily: fonts.bodyMedium, fontSize: 11.5, letterSpacing: 1, color: BLUE, textTransform: 'uppercase' },

  heading: {
    fontFamily: fonts.display,
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: -0.6,
    color: colors.ink,
    textAlign: 'center',
    marginTop: 18,
  },
  headingAccent: { color: BLUE },
  lead: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 26,
    color: colors.bodyMutedOnLight,
    textAlign: 'center',
    marginTop: 14,
  },

  stepGrid: { flexDirection: 'row', gap: 24 },
  stepGridStacked: { flexDirection: 'column' },
  stepColumn: { flex: 1, gap: 12 },
  stepColumnHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 6 },
  stepColumnIcon: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  stepColumnLabel: { fontFamily: fonts.displayMedium, fontSize: 16, color: colors.ink },
  stepCard: {
    flexDirection: 'row',
    gap: 14,
    backgroundColor: GLASS_BG,
    borderWidth: 1,
    borderColor: GLASS_BORDER,
    borderRadius: 16,
    padding: 16,
    // @ts-ignore -- web-only glass blur, no-op on native
    backdropFilter: IS_WEB ? 'blur(16px) saturate(150%)' : undefined,
  },
  stepNumber: { width: 28, height: 28, borderRadius: 9, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  stepNumberText: { fontFamily: fonts.displayMedium, fontSize: 13 },
  stepTitle: { fontFamily: fonts.bodyMedium, fontSize: 14.5, color: colors.ink, marginBottom: 4 },
  stepDescription: { fontFamily: fonts.body, fontSize: 13, lineHeight: 20, color: colors.bodyMutedOnLight },
});