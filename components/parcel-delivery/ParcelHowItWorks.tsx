import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';

const IS_WEB = Platform.OS === 'web';

const AMBER = colors.accentBlue; // sender track
const AMBER_SKY = '#5B8DEF'; // captain track — lighter neighbouring blue tone
const AMBER_ICE = colors.chipBg;
const AMBER_SKY_BG = '#E3E9FB';
const AMBER_BORDER = 'rgba(51,80,222,0.18)';
const GLASS_BG = 'rgba(255,255,255,0.66)';
const GLASS_BORDER = 'rgba(255,255,255,0.9)';

type Step = { title: string; description: string };

const SENDER_STEPS: Step[] = [
  {
    title: 'Enter pickup and drop',
    description: 'Add where the parcel is coming from, where it\u2019s going, and roughly what\u2019s inside.',
  },
  {
    title: 'Get an instant fare',
    description: 'See the price up front, based on distance and package size \u2014 no surprises at drop-off.',
  },
  {
    title: 'A nearby captain is assigned',
    description: 'Track them on the map from pickup to your door, in real time.',
  },
  {
    title: 'Confirm delivery with OTP',
    description: 'The recipient shares a one-time code (or signs digitally) so you get proof it landed safely.',
  },
];

const CAPTAIN_STEPS: Step[] = [
  {
    title: 'Go online nearby',
    description: 'Turn on parcel requests alongside your regular rides \u2014 no separate sign-up needed.',
  },
  {
    title: 'Accept a pickup',
    description: 'See the pickup point, drop point and package size before you accept.',
  },
  {
    title: 'Photograph the handover',
    description: 'Snap the parcel at pickup and at delivery \u2014 your proof it left, and reached, in good shape.',
  },
  {
    title: 'Get paid per completed trip',
    description: 'Earnings are added to your daily payout the moment the OTP confirms delivery.',
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
  const bg = tone === 'deep' ? AMBER_ICE : AMBER_SKY_BG;
  const fg = tone === 'deep' ? AMBER : AMBER_SKY;

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

export default function ParcelHowItWorks({ isDesktop }: { isDesktop: boolean }) {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Ionicons name="git-network-outline" size={13} color={AMBER} />
          <Text style={styles.badgeLabel}>How It Works</Text>
        </View>
        <Text style={styles.heading}>
          Send a parcel, <Text style={styles.headingAccent}>or deliver one.</Text>
        </Text>
        <Text style={styles.lead}>Parcel delivery lives right inside the same Fatafat app.</Text>
      </View>

      <View style={[styles.stepGrid, !isDesktop && styles.stepGridStacked]}>
        <StepColumn icon="cube-outline" label="As a sender" steps={SENDER_STEPS} tone="deep" />
        <StepColumn icon="bicycle-outline" label="As a captain" steps={CAPTAIN_STEPS} tone="sky" />
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
    backgroundColor: AMBER_ICE,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: AMBER_BORDER,
  },
  badgeLabel: { fontFamily: fonts.bodyMedium, fontSize: 11.5, letterSpacing: 1, color: AMBER, textTransform: 'uppercase' },

  heading: {
    fontFamily: fonts.display,
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: -0.6,
    color: colors.ink,
    textAlign: 'center',
    marginTop: 18,
  },
  headingAccent: { color: AMBER },
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
