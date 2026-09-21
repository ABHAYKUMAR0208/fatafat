import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';

const AMBER = colors.accentBlue;

const BREAKDOWN = [
  { label: 'Fare paid by rider', value: '₹250', note: 'Fixed, shown upfront' },
  { label: 'Fatafat commission', value: '−₹30', note: 'Flat 12%, no surge cuts' },
  { label: 'You keep', value: '₹220', note: 'Paid out weekly to UPI' },
];

const PERKS = [
  { icon: 'calendar-outline' as const, title: 'Weekly payouts', description: 'Every Tuesday at 6 AM, straight to your linked UPI account.' },
  { icon: 'trending-down-outline' as const, title: 'Flat 12% commission', description: 'No surge-time deductions, no peak-hour cuts — the same rate, always.' },
  { icon: 'heart-outline' as const, title: 'Family insurance', description: 'Health and accident cover for you and your family from trip one.' },
  { icon: 'stats-chart-outline' as const, title: 'Earnings dashboard', description: 'See fares, commission and payouts broken down trip by trip, live.' },
];

export default function EarningsSection({ isDesktop }: { isDesktop: boolean }) {
  return (
    <View style={[styles.section, !isDesktop && styles.sectionStacked]}>
      <View style={[styles.textCol, !isDesktop && styles.textColStacked]}>
        <View style={styles.badge}>
          <View style={styles.badgeDot} />
          <Text style={styles.badgeLabel}>EARNINGS, EXPLAINED</Text>
        </View>

        <Text style={styles.heading}>
          You always know <Text style={styles.headingAccent}>what you'll keep.</Text>
        </Text>

        <Text style={styles.lead}>
          Fatafat takes a flat 12% commission on every trip — no matter the time, the demand, or the
          route. What's left is yours, paid out every week without you having to ask.
        </Text>

        <View style={styles.perkGrid}>
          {PERKS.map((p) => (
            <View key={p.title} style={styles.perkRow}>
              <View style={styles.perkIcon}>
                <Ionicons name={p.icon} size={16} color={AMBER} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.perkTitle}>{p.title}</Text>
                <Text style={styles.perkDescription}>{p.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.cardCol, !isDesktop && styles.cardColStacked]}>
        <View style={styles.breakdownCard}>
          <Text style={styles.breakdownTitle}>Sample trip breakdown</Text>
          {BREAKDOWN.map((row, i) => (
            <View key={row.label}>
              <View style={styles.breakdownRow}>
                <View>
                  <Text style={styles.breakdownLabel}>{row.label}</Text>
                  <Text style={styles.breakdownNote}>{row.note}</Text>
                </View>
                <Text style={[styles.breakdownValue, i === 2 && styles.breakdownValueFinal]}>{row.value}</Text>
              </View>
              {i < BREAKDOWN.length - 1 && <View style={styles.breakdownDivider} />}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    gap: 48,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  sectionStacked: { flexDirection: 'column' },

  textCol: { flex: 1.1 },
  textColStacked: { width: '100%' },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 8,
    backgroundColor: colors.chipBg,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(51,80,222,0.18)',
    marginBottom: 20,
  },
  badgeDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: AMBER },
  badgeLabel: { fontFamily: fonts.bodyMedium, fontSize: 11.5, letterSpacing: 1, color: AMBER },

  heading: {
    fontFamily: fonts.display,
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.8,
    color: colors.ink,
    marginBottom: 16,
  },
  headingAccent: { color: AMBER },
  lead: { fontFamily: fonts.body, fontSize: 15.5, lineHeight: 25, color: colors.bodyMutedOnLight, marginBottom: 28 },

  perkGrid: { gap: 18 },
  perkRow: { flexDirection: 'row', gap: 14 },
  perkIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: colors.chipBg,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  perkTitle: { fontFamily: fonts.bodyMedium, fontSize: 14.5, color: colors.ink, marginBottom: 2 },
  perkDescription: { fontFamily: fonts.body, fontSize: 13, lineHeight: 19, color: colors.bodyMutedOnLight },

  cardCol: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  cardColStacked: { width: '100%' },

  breakdownCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(15,23,42,0.06)',
    padding: 26,
    shadowColor: colors.navy,
    shadowOpacity: 0.06,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 12 },
    elevation: 3,
  },
  breakdownTitle: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.bodyMutedOnLight, marginBottom: 18 },
  breakdownRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14 },
  breakdownLabel: { fontFamily: fonts.bodyMedium, fontSize: 14, color: colors.ink },
  breakdownNote: { fontFamily: fonts.body, fontSize: 11.5, color: colors.bodyMutedOnLight, marginTop: 2 },
  breakdownValue: { fontFamily: fonts.displayMedium, fontSize: 16, color: colors.ink },
  breakdownValueFinal: { color: AMBER, fontSize: 20 },
  breakdownDivider: { height: 1, backgroundColor: 'rgba(15,23,42,0.06)' },
});
