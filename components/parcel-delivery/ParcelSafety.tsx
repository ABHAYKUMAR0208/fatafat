import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';

const IS_WEB = Platform.OS === 'web';

const AMBER = colors.accentBlue;
const AMBER_DEEP = colors.navy;
const AMBER_ICE = colors.chipBg;
const AMBER_BORDER = 'rgba(51,80,222,0.18)';
const GLASS_BG = 'rgba(255,255,255,0.7)';
const GLASS_BORDER = 'rgba(255,255,255,0.9)';

type Feature = {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  gradient: [string, string];
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    id: 'otp',
    icon: 'keypad-outline',
    gradient: [AMBER_DEEP, AMBER],
    title: 'OTP-verified handover',
    description: 'The parcel is only marked delivered once the recipient shares the one-time code \u2014 no exceptions.',
  },
  {
    id: 'photo',
    icon: 'camera-outline',
    gradient: [AMBER, '#5B8DEF'],
    title: 'Photo proof, both ends',
    description: 'A timestamped photo at pickup and at delivery, saved to your order history.',
  },
  {
    id: 'tracking',
    icon: 'navigate-outline',
    gradient: ['#2A3E9E', '#5B8DEF'],
    title: 'Live tracking, start to finish',
    description: 'Watch your captain move on the map from pickup to your recipient\u2019s door.',
  },
  {
    id: 'verified',
    icon: 'id-card-outline',
    gradient: [AMBER_DEEP, AMBER],
    title: 'Verified captains only',
    description: 'Every delivery captain passes the same ID and vehicle checks as our ride captains.',
  },
  {
    id: 'protection',
    icon: 'shield-checkmark-outline',
    gradient: [AMBER, '#5B8DEF'],
    title: 'Goods protection',
    description: 'Declared-value parcels are covered against loss or damage in transit, within policy limits.',
  },
  {
    id: 'report',
    icon: 'flag-outline',
    gradient: [AMBER_DEEP, AMBER],
    title: 'Report a delivery, anytime',
    description: 'Something feel off with a pickup or drop-off? Report it in one tap \u2014 every report is reviewed.',
  },
];

function SafetyCard({ feature }: { feature: Feature }) {
  const [hovered, setHovered] = useState(false);
  const hoverHandlers = IS_WEB
    ? {
        // @ts-ignore -- web only pointer events
        onMouseEnter: () => setHovered(true),
        // @ts-ignore -- web only pointer events
        onMouseLeave: () => setHovered(false),
      }
    : {};

  return (
    <View style={[styles.card, hovered && styles.cardHovered]} {...hoverHandlers}>
      <LinearGradient
        colors={feature.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.iconWrap, hovered && { transform: [{ scale: 1.08 }] }]}
      >
        <Ionicons name={feature.icon} size={20} color="#FFFFFF" />
      </LinearGradient>
      <Text style={styles.cardTitle}>{feature.title}</Text>
      <Text style={styles.cardDescription}>{feature.description}</Text>
    </View>
  );
}

export default function ParcelSafety() {
  return (
    <View style={styles.section}>
      <View pointerEvents="none" style={styles.glowLayer}>
        <View style={styles.glowBlob} />
      </View>

      <View style={styles.header}>
        <View style={styles.badge}>
          <Ionicons name="shield-checkmark-outline" size={13} color={AMBER} />
          <Text style={styles.badgeLabel}>Safety & Trust</Text>
        </View>
        <Text style={styles.heading}>
          Every parcel is tracked, <Text style={styles.headingAccent}>proven, and protected.</Text>
        </Text>
        <Text style={styles.lead}>
          From OTP handovers to live tracking and goods protection, every layer is designed so
          you know exactly where your parcel is.
        </Text>
      </View>

      <View style={styles.grid}>
        {FEATURES.map((f) => (
          <SafetyCard key={f.id} feature={f} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 24, paddingVertical: 48, maxWidth: 1200, width: '100%', alignSelf: 'center', position: 'relative' },

  glowLayer: { ...StyleSheet.absoluteFillObject, overflow: 'hidden' },
  glowBlob: {
    position: 'absolute',
    width: 340,
    height: 340,
    borderRadius: 170,
    opacity: 0.1,
    backgroundColor: AMBER,
    top: -60,
    left: -100,
    // @ts-ignore -- web-only soft blur, no-op on native
    filter: IS_WEB ? 'blur(70px)' : undefined,
  },

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

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 20, justifyContent: 'center' },
  card: {
    flexGrow: 1,
    flexBasis: 260,
    maxWidth: 320,
    borderRadius: 20,
    padding: 24,
    backgroundColor: GLASS_BG,
    borderWidth: 1,
    borderColor: GLASS_BORDER,
    shadowColor: AMBER_DEEP,
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 4,
    // @ts-ignore -- web-only glass blur, no-op on native
    backdropFilter: IS_WEB ? 'blur(20px) saturate(160%)' : undefined,
    // @ts-ignore -- web-only transition, no-op on native
    transitionProperty: 'transform, box-shadow',
    // @ts-ignore -- web-only transition, no-op on native
    transitionDuration: '250ms',
  },
  cardHovered: { transform: [{ translateY: -6 }] },

  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    // @ts-ignore -- web-only transition, no-op on native
    transitionProperty: 'transform',
    // @ts-ignore -- web-only transition, no-op on native
    transitionDuration: '250ms',
  },

  cardTitle: { fontFamily: fonts.displayMedium, fontSize: 17, color: colors.ink, marginBottom: 8 },
  cardDescription: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 20, color: colors.bodyMutedOnLight },
});
