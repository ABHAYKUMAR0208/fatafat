import { Platform, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';

const IS_WEB = Platform.OS === 'web';
const GLASS_BG = 'rgba(255,255,255,0.6)';
const GLASS_BORDER = 'rgba(255,255,255,0.9)';

const STATS = [
  { value: '0', label: 'Surge charges, ever' },
  { value: '100%', label: 'Captains insured from trip one' },
  { value: '<30s', label: 'Average SOS response time' },
  { value: '4.8★', label: 'Average rider rating' },
];

export default function WhyFatafatStats({ isDesktop }: { isDesktop: boolean }) {
  return (
    <View style={[styles.statsRow, !isDesktop && styles.statsRowStacked]}>
      {STATS.map((s) => (
        <View key={s.label} style={styles.statTile}>
          <Text style={styles.statValue}>{s.value}</Text>
          <Text style={styles.statLabel}>{s.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  statsRowStacked: { flexDirection: 'column' },
  statTile: {
    flex: 1,
    backgroundColor: GLASS_BG,
    borderWidth: 1,
    borderColor: GLASS_BORDER,
    borderRadius: 18,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: colors.navy,
    shadowOpacity: 0.06,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
    // @ts-ignore -- web-only glass blur, no-op on native
    backdropFilter: IS_WEB ? 'blur(16px) saturate(150%)' : undefined,
  },
  statValue: { fontFamily: fonts.display, fontSize: 24, color: colors.ink },
  statLabel: { fontFamily: fonts.body, fontSize: 12, color: colors.bodyMutedOnLight, marginTop: 4, textAlign: 'center' },
});
