import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';

const ROWS: { label: string; fatafat: string; typical: string }[] = [
  { label: 'Fare shown', fatafat: 'Before you book, fixed', typical: 'Estimated, can rise en route' },
  { label: 'Surge pricing', fatafat: 'Never', typical: 'During peak demand' },
  { label: 'Cheapest option', fatafat: 'Surfaced automatically', typical: 'You compare manually' },
  { label: 'Safety monitoring', fatafat: 'Always-on Safety Hub', typical: 'SOS button only' },
  { label: 'Captain insurance', fatafat: 'From trip one, free', typical: 'Varies by tenure' },
];

export default function CompareBand({ isDesktop }: { isDesktop: boolean }) {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Ionicons name="git-compare-outline" size={13} color={colors.accentBlue} />
          <Text style={styles.badgeLabel}>HOW WE COMPARE</Text>
        </View>
        <Text style={styles.heading}>
          Not just <Text style={styles.headingAccent}>another ride app.</Text>
        </Text>
      </View>

      <View style={styles.table}>
        <View style={[styles.row, styles.rowHead]}>
          <Text style={[styles.cell, styles.cellLabel, styles.headText]} />
          <Text style={[styles.cell, styles.headText, styles.fatafatHead]}>Fatafat</Text>
          <Text style={[styles.cell, styles.headText]}>Typical apps</Text>
        </View>

        {ROWS.map((r, i) => (
          <View key={r.label} style={[styles.row, i % 2 === 1 && styles.rowAlt]}>
            <Text style={[styles.cell, styles.cellLabel]}>{r.label}</Text>
            <View style={[styles.cell, styles.fatafatCell]}>
              <Ionicons name="checkmark-circle" size={14} color={colors.accentBlue} />
              <Text style={styles.fatafatText} numberOfLines={isDesktop ? 1 : undefined}>
                {r.fatafat}
              </Text>
            </View>
            <Text style={[styles.cell, styles.typicalText]}>{r.typical}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 24, paddingVertical: 48, maxWidth: 900, width: '100%', alignSelf: 'center' },
  header: { alignItems: 'center', marginBottom: 32 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.chipBg,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(51,80,222,0.18)',
    marginBottom: 18,
  },
  badgeLabel: { fontFamily: fonts.bodyMedium, fontSize: 11.5, letterSpacing: 1, color: colors.accentBlue },
  heading: {
    fontFamily: fonts.display,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.6,
    color: colors.ink,
    textAlign: 'center',
  },
  headingAccent: { color: colors.accentBlue },

  table: {
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(15,23,42,0.06)',
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 18 },
  rowHead: { backgroundColor: colors.navy, paddingVertical: 12 },
  rowAlt: { backgroundColor: 'rgba(51,80,222,0.03)' },
  cell: { flex: 1 },
  cellLabel: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.ink },
  headText: { fontFamily: fonts.bodyMedium, fontSize: 12, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: 0.6 },
  fatafatHead: { color: '#93C5FD' },
  fatafatCell: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  fatafatText: { fontFamily: fonts.bodyMedium, fontSize: 12.5, color: colors.ink, flexShrink: 1 },
  typicalText: { fontFamily: fonts.body, fontSize: 12.5, color: colors.bodyMutedOnLight },
});
