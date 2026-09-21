import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';

const IS_WEB = Platform.OS === 'web';

const BLUE = colors.accentBlue;
const BLUE_DEEP = colors.navy;
const BLUE_ICE = colors.chipBg;
const BLUE_BORDER = 'rgba(51,80,222,0.18)';
const GLASS_BG = 'rgba(255,255,255,0.66)';
const GLASS_BORDER = 'rgba(255,255,255,0.9)';

const PRICE_PER_SEAT = 450;

const POINTS = [
  {
    icon: 'options-outline' as const,
    title: 'Driver sets the price',
    body: 'Per-seat pricing to share fuel and toll costs \u2014 never to make a profit.',
  },
  {
    icon: 'scale-outline' as const,
    title: 'Suggested range keeps it fair',
    body: 'We show a recommended band for the route based on distance, so prices stay consistent.',
  },
  {
    icon: 'receipt-outline' as const,
    title: 'Small service fee added',
    body: 'A nominal platform fee at booking \u2014 that, not a cut of the driver\u2019s price, supports the app.',
  },
];

export default function CarpoolPricing({ isDesktop }: { isDesktop: boolean }) {
  const [seats, setSeats] = useState(2);
  const driverTotal = PRICE_PER_SEAT * seats;
  const fee = Math.round(25 + driverTotal * 0.022);
  const total = driverTotal + fee;

  return (
    <View style={styles.section}>
      <View pointerEvents="none" style={styles.glowLayer}>
        <View style={styles.glowBlob} />
      </View>

      <View style={[styles.row, !isDesktop && styles.rowStacked]}>
        <View style={styles.text}>
          <View style={styles.badge}>
            <Ionicons name="pricetag-outline" size={13} color={BLUE} />
            <Text style={styles.badgeLabel}>How Pricing Works</Text>
          </View>
          <Text style={styles.heading}>
            The driver sets the price.{'\n'}
            <Text style={styles.headingAccent}>We just keep it honest.</Text>
          </Text>
          <Text style={styles.lead}>
            Carpool isn’t a company-dispatched ride, so it isn’t a company-fixed fare either —
            but it’s not a free-for-all either. Every driver sets a per-seat price, guided by a
            suggested range based on distance.
          </Text>

          <View style={{ marginTop: 24, gap: 16 }}>
            {POINTS.map((row) => (
              <View key={row.title} style={{ flexDirection: 'row', gap: 14, alignItems: 'flex-start' }}>
                <View style={styles.pointIcon}>
                  <Ionicons name={row.icon} size={15} color={BLUE} />
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
          <Text style={styles.calcHeading}>Price calculator</Text>

          <Text style={styles.calcLabel}>Price per seat (set by driver)</Text>
          <View style={styles.calcPriceRow}>
            <Text style={styles.calcPriceValue}>₹{PRICE_PER_SEAT}</Text>
            <Text style={styles.calcPriceHint}>per seat</Text>
          </View>

          <Text style={[styles.calcLabel, { marginTop: 20 }]}>Number of seats</Text>
          <View style={styles.seatStepper}>
            <Pressable style={styles.seatBtn} onPress={() => setSeats((s) => Math.max(1, s - 1))}>
              <Ionicons name="remove" size={16} color={colors.ink} />
            </Pressable>
            <Text style={styles.seatCount}>{seats}</Text>
            <Pressable style={styles.seatBtn} onPress={() => setSeats((s) => Math.min(6, s + 1))}>
              <Ionicons name="add" size={16} color={colors.ink} />
            </Pressable>
          </View>

          <View style={styles.calcBreakdown}>
            <View style={styles.calcBreakdownRow}>
              <Text style={styles.calcBreakdownLabel}>Driver's price ({seats} seats)</Text>
              <Text style={styles.calcBreakdownValue}>₹{driverTotal.toLocaleString('en-IN')}</Text>
            </View>
            <View style={styles.calcBreakdownRow}>
              <Text style={styles.calcBreakdownLabel}>Service fee</Text>
              <Text style={styles.calcBreakdownValue}>₹{fee.toLocaleString('en-IN')}</Text>
            </View>
            <View style={[styles.calcBreakdownRow, styles.calcTotalRow]}>
              <Text style={styles.calcTotalLabel}>You pay</Text>
              <Text style={styles.calcTotalValue}>₹{total.toLocaleString('en-IN')}</Text>
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
    opacity: 0.1,
    backgroundColor: BLUE,
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
    marginTop: 18,
  },
  headingAccent: { color: BLUE },
  lead: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 26,
    color: colors.bodyMutedOnLight,
    marginTop: 14,
  },

  pointIcon: { width: 30, height: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: BLUE_ICE, flexShrink: 0 },
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
    shadowColor: BLUE_DEEP,
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 4,
    // @ts-ignore -- web-only glass blur, no-op on native
    backdropFilter: IS_WEB ? 'blur(20px) saturate(160%)' : undefined,
  },
  calcHeading: { fontFamily: fonts.displayMedium, fontSize: 17, color: colors.ink, marginBottom: 18 },
  calcLabel: { fontFamily: fonts.bodyMedium, fontSize: 12, color: colors.bodyMutedOnLight, marginBottom: 8 },
  calcPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  calcPriceValue: { fontFamily: fonts.display, fontSize: 22, color: BLUE },
  calcPriceHint: { fontFamily: fonts.body, fontSize: 12.5, color: colors.bodyMutedOnLight },
  seatStepper: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  seatBtn: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seatCount: { fontFamily: fonts.display, fontSize: 20, color: colors.ink, minWidth: 24, textAlign: 'center' },
  calcBreakdown: { marginTop: 22, paddingTop: 18, borderTopWidth: 1, borderTopColor: colors.border, gap: 10 },
  calcBreakdownRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  calcBreakdownLabel: { fontFamily: fonts.body, fontSize: 13.5, color: colors.bodyMutedOnLight },
  calcBreakdownValue: { fontFamily: fonts.bodyMedium, fontSize: 13.5, color: colors.ink },
  calcTotalRow: { marginTop: 4, paddingTop: 12, borderTopWidth: 1, borderTopColor: colors.border },
  calcTotalLabel: { fontFamily: fonts.displayMedium, fontSize: 15, color: colors.ink },
  calcTotalValue: { fontFamily: fonts.display, fontSize: 22, color: BLUE },
});