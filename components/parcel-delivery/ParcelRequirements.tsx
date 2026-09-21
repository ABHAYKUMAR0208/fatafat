import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';

const IS_WEB = Platform.OS === 'web';

const AMBER = colors.accentBlue;
const AMBER_DEEP = colors.navy;
const AMBER_ICE = colors.chipBg;
const AMBER_BORDER = 'rgba(51,80,222,0.18)';
const GLASS_BG = 'rgba(255,255,255,0.66)';
const GLASS_BORDER = 'rgba(255,255,255,0.9)';

type Requirement = { id: string; title: string; description: string };

const REQUIREMENTS: Requirement[] = [
  {
    id: 'weight',
    title: 'Up to 10 kg, within Medium size',
    description: 'Document, Small and Medium cover most everyday parcels \u2014 heavier or bulkier items need a different service.',
  },
  {
    id: 'packaging',
    title: 'Sealed and properly packaged',
    description: 'Wrap or box the item so it survives a two-wheeler ride \u2014 captains can decline loose or damaged packaging.',
  },
  {
    id: 'declared-value',
    title: 'Declare the value for anything fragile or costly',
    description: 'Declaring value at booking is what makes an item eligible for goods protection.',
  },
  {
    id: 'prohibited',
    title: 'No restricted or illegal items',
    description: 'Cash, weapons, live animals, perishables and hazardous or illegal goods can\u2019t be sent through Parcel.',
  },
];

export default function ParcelRequirements() {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Ionicons name="clipboard-outline" size={13} color={AMBER} />
          <Text style={styles.badgeLabel}>What You Can Send</Text>
        </View>
        <Text style={styles.heading}>Guidelines before you book</Text>
      </View>

      <View style={styles.card}>
        {REQUIREMENTS.map((req, i) => (
          <View key={req.id} style={[styles.reqRow, i === REQUIREMENTS.length - 1 && styles.reqRowLast]}>
            <View style={styles.reqTick}>
              <Ionicons name="checkmark" size={14} color={AMBER} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.reqTitle}>{req.title}</Text>
              <Text style={styles.reqDescription}>{req.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 24,
    paddingVertical: 48,
    maxWidth: 760,
    width: '100%',
    alignSelf: 'center',
  },
  header: { alignItems: 'center', marginBottom: 24 },
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
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.5,
    color: colors.ink,
    textAlign: 'center',
    marginTop: 18,
  },

  card: {
    backgroundColor: GLASS_BG,
    borderWidth: 1,
    borderColor: GLASS_BORDER,
    borderRadius: 20,
    paddingHorizontal: 20,
    shadowColor: AMBER_DEEP,
    shadowOpacity: 0.06,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
    // @ts-ignore -- web-only glass blur, no-op on native
    backdropFilter: IS_WEB ? 'blur(18px) saturate(150%)' : undefined,
  },
  reqRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  reqRowLast: { borderBottomWidth: 0 },
  reqTick: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: AMBER_ICE,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 2,
  },
  reqTitle: { fontFamily: fonts.displayMedium, fontSize: 16, color: colors.ink, marginBottom: 4 },
  reqDescription: { fontFamily: fonts.body, fontSize: 14, lineHeight: 21, color: colors.bodyMutedOnLight },
});
