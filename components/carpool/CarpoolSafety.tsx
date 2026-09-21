import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';

const IS_WEB = Platform.OS === 'web';

const BLUE = colors.accentBlue;
const BLUE_DEEP = colors.navy;
const BLUE_ICE = colors.chipBg;
const BLUE_BORDER = 'rgba(51,80,222,0.18)';
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
    id: 'id',
    icon: 'id-card-outline',
    gradient: [BLUE_DEEP, BLUE],
    title: 'Verified ID, both sides',
    description:
      'Drivers verify their licence and vehicle; every rider is a verified platform account. No anonymous matches.',
  },
  {
    id: 'chat',
    icon: 'chatbubble-ellipses-outline',
    gradient: [BLUE, '#5B8DEF'],
    title: 'Message and call in-app only',
    description: 'Coordinate pickup details through masked chat and call \u2014 your real number is never shared.',
  },
  {
    id: 'rating',
    icon: 'star-outline',
    gradient: ['#1E9BE0', '#5FC1F0'],
    title: 'Ratings after every ride',
    description: 'Passengers and drivers rate each other \u2014 check a rating and ride count before you book.',
  },
  {
    id: 'women-only',
    icon: 'female-outline',
    gradient: [BLUE_DEEP, '#3350DE'],
    title: 'Prefer a women-only ride?',
    description: 'Pink Fleet gives women riders and drivers a same-gender option on select vehicle types.',
  },
  {
    id: 'confirm',
    icon: 'checkmark-circle-outline',
    gradient: [BLUE, '#1E9BE0'],
    title: 'Confirm before you travel',
    description: 'Check the car, driver and booking details before you get in. If anything\u2019s off, cancel and report it.',
  },
  {
    id: 'report',
    icon: 'flag-outline',
    gradient: ['#274690', BLUE],
    title: 'Report a ride, anytime',
    description: 'Anything feel wrong before, during or after a trip? Report it in one tap \u2014 every report is reviewed.',
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

export default function CarpoolSafety() {
  return (
    <View style={styles.section}>
      <View pointerEvents="none" style={styles.glowLayer}>
        <View style={styles.glowBlob} />
      </View>

      <View style={styles.header}>
        <View style={styles.badge}>
          <Ionicons name="shield-checkmark-outline" size={13} color={BLUE} />
          <Text style={styles.badgeLabel}>Safety & Trust</Text>
        </View>
        <Text style={styles.heading}>
          Every match is between <Text style={styles.headingAccent}>two verified people.</Text>
        </Text>
        <Text style={styles.lead}>
          From ID checks to in-app messaging and post-ride ratings, every layer is designed so you can
          ride with confidence.
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
    backgroundColor: BLUE,
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
    shadowColor: BLUE_DEEP,
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