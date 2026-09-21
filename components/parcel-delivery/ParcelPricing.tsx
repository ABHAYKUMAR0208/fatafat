import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';

const IS_WEB = Platform.OS === 'web';

const AMBER = colors.accentBlue;
const AMBER_DEEP = colors.navy;
const AMBER_ICE = colors.chipBg;
const AMBER_BORDER = 'rgba(51,80,222,0.18)';
const GLASS_BG = 'rgba(255,255,255,0.66)';
const GLASS_BORDER = 'rgba(255,255,255,0.9)';

const BASE_FARE = 29;
const PER_KM_RATE = 8;
const SIZE_SURCHARGE: Record<'Document' | 'Small' | 'Medium', number> = {
  Document: 0,
  Small: 15,
  Medium: 35,
};

const POINTS = [
  {
    icon: 'speedometer-outline' as const,
    title: 'Distance-based, up front',
    body: 'A base fare plus a per-km rate \u2014 shown before you book, not estimated after.',
  },
  {
    icon: 'resize-outline' as const,
    title: 'Package size sets the rest',
    body: 'Document, Small or Medium \u2014 a small, transparent surcharge covers handling and space.',
  },
  {
    icon: 'shield-checkmark-outline' as const,
    title: 'No hidden delivery charges',
    body: 'The fare shown at booking is exactly what you pay \u2014 captains are paid the same amount, always.',
  },
];

export default function ParcelPricing({ isDesktop }: { isDesktop: boolean }) {
  const [distance, setDistance] = useState(6);
  const [size, setSize] = useState<'Document' | 'Small' | 'Medium'>('Small');

  const { fare, surcharge, total } = useMemo(() => {
    const fare = Math.round(BASE_FARE + distance * PER_KM_RATE);
    const surcharge = SIZE_SURCHARGE[size];
    return { fare, surcharge, total: fare + surcharge };
  }, [distance, size]);

  return (
    <View style={styles.section}>
      <View pointerEvents="none" style={styles.glowLayer}>
        <View style={styles.glowBlob} />
      </View>

      <View style={[styles.row, !isDesktop && styles.rowStacked]}>
        <View style={styles.text}>
          <View style={styles.badge}>
            <Ionicons name="pricetag-outline" size={13} color={AMBER} />
            <Text style={styles.badgeLabel}>How Pricing Works</Text>
          </View>
          <Text style={styles.heading}>
            One fare, shown up front.{'\n'}
            <Text style={styles.headingAccent}>No surprise charges at drop-off.</Text>
          </Text>
          <Text style={styles.lead}>
            Parcel fares are distance-based, with a small surcharge for larger packages \u2014
            the same fare a captain sees when they accept the pickup.
          </Text>

          <View style={{ marginTop: 24, gap: 16 }}>
            {POINTS.map((row) => (
              <View key={row.title} style={{ flexDirection: 'row', gap: 14, alignItems: 'flex-start' }}>
                <View style={styles.pointIcon}>
                  <Ionicons name={row.icon} size={15} color={AMBER} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.pointTitle}>{row.title}</Text>
                  <Text style={styles.pointBody}>{row.body}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.calcCard}>
          <Text style={styles.calcHeading}>Fare calculator</Text>

          <Text style={styles.calcLabel}>Distance ({distance} km)</Text>
          <View style={styles.seatStepper}>
            <Pressable style={styles.seatBtn} onPress={() => setDistance((d) => Math.max(1, d - 1))}>
              <Ionicons name="remove" size={16} color={colors.ink} />
            </Pressable>
            <Text style={styles.seatCount}>{distance} km</Text>
            <Pressable style={styles.seatBtn} onPress={() => setDistance((d) => Math.min(30, d + 1))}>
              <Ionicons name="add" size={16} color={colors.ink} />
            </Pressable>
          </View>

          <Text style={[styles.calcLabel, { marginTop: 20 }]}>Package size</Text>
          <View style={styles.sizeRow}>
            {(['Document', 'Small', 'Medium'] as const).map((s) => (
              <Pressable
                key={s}
                style={[styles.sizeChip, size === s && styles.sizeChipActive]}
                onPress={() => setSize(s)}
              >
                <Text style={[styles.sizeChipText, size === s && styles.sizeChipTextActive]}>{s}</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.calcBreakdown}>
            <View style={styles.calcBreakdownRow}>
              <Text style={styles.calcBreakdownLabel}>Base + distance fare</Text>
              <Text style={styles.calcBreakdownValue}>₹{fare}</Text>
            </View>
            <View style={styles.calcBreakdownRow}>
              <Text style={styles.calcBreakdownLabel}>Package size surcharge</Text>
              <Text style={styles.calcBreakdownValue}>₹{surcharge}</Text>
            </View>
            <View style={[styles.calcBreakdownRow, styles.calcTotalRow]}>
              <Text style={styles.calcTotalLabel}>You pay</Text>
              <Text style={styles.calcTotalValue}>₹{total}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 24, paddingVertical: 48, maxWidth: 1200, width: '100%', alignSelf: 'center', position: 'relative' },

  glowLayer: { ...StyleSheet.absoluteFillObject, overflow: 'hidden' },
  glowBlob: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    opacity: 0.12,
    backgroundColor: colors.accentBlue,
    top: -40,
    right: -60,
    // @ts-ignore -- web-only soft blur, no-op on native
    filter: IS_WEB ? 'blur(70px)' : undefined,
  },

  row: { flexDirection: 'row', gap: 48, alignItems: 'flex-start' },
  rowStacked: { flexDirection: 'column', gap: 32 },
  text: { flex: 1 },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
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
    marginTop: 18,
  },
  headingAccent: { color: AMBER },
  lead: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 26,
    color: colors.bodyMutedOnLight,
    marginTop: 14,
  },

  pointIcon: { width: 30, height: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: AMBER_ICE, flexShrink: 0 },
  pointTitle: { fontFamily: fonts.bodyMedium, fontSize: 14.5, color: colors.ink, marginBottom: 4 },
  pointBody: { fontFamily: fonts.body, fontSize: 13, lineHeight: 20, color: colors.bodyMutedOnLight },

  calcCard: {
    flex: 1,
    backgroundColor: GLASS_BG,
    borderWidth: 1,
    borderColor: GLASS_BORDER,
    borderRadius: 20,
    padding: 24,
    minWidth: 280,
    overflow: 'hidden',
    shadowColor: AMBER_DEEP,
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 4,
    // @ts-ignore -- web-only glass blur, no-op on native
    backdropFilter: IS_WEB ? 'blur(20px) saturate(160%)' : undefined,
  },
  calcHeading: { fontFamily: fonts.displayMedium, fontSize: 17, color: colors.ink, marginBottom: 18 },
  calcLabel: { fontFamily: fonts.bodyMedium, fontSize: 12, color: colors.bodyMutedOnLight, marginBottom: 8 },
  seatStepper: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  seatBtn: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seatCount: { fontFamily: fonts.display, fontSize: 18, color: colors.ink, minWidth: 64, textAlign: 'center' },

  sizeRow: { flexDirection: 'row', gap: 8 },
  sizeChip: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  sizeChipActive: { backgroundColor: AMBER },
  sizeChipText: { fontFamily: fonts.bodyMedium, fontSize: 12.5, color: colors.ink },
  sizeChipTextActive: { color: '#FFFFFF' },

  calcBreakdown: { marginTop: 22, paddingTop: 18, borderTopWidth: 1, borderTopColor: colors.border, gap: 10 },
  calcBreakdownRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  calcBreakdownLabel: { fontFamily: fonts.body, fontSize: 13.5, color: colors.bodyMutedOnLight },
  calcBreakdownValue: { fontFamily: fonts.bodyMedium, fontSize: 13.5, color: colors.ink },
  calcTotalRow: { marginTop: 4, paddingTop: 12, borderTopWidth: 1, borderTopColor: colors.border },
  calcTotalLabel: { fontFamily: fonts.displayMedium, fontSize: 15, color: colors.ink },
  calcTotalValue: { fontFamily: fonts.display, fontSize: 22, color: AMBER },
});
