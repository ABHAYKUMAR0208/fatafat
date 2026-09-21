import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';

const IS_WEB = Platform.OS === 'web';

type Feature = {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  gradient: [string, string];
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    id: 'verified',
    icon: 'shield-checkmark-outline',
    gradient: [colors.magenta, '#FB7185'],
    title: 'Verified before her first ride',
    description:
      'Every lady captain completes background checks, age verification, and government ID validation before picking up her first passenger.',
  },
  {
    id: 'in-app-comms',
    icon: 'chatbubble-ellipses-outline',
    gradient: ['#8B5CF6', '#A78BFA'],
    title: 'Message & call in-app only',
    description:
      'Your personal number stays private. All communication happens through our secure encrypted messaging system.',
  },
  {
    id: 'sos',
    icon: 'warning-outline',
    gradient: [colors.amber, '#FB923C'],
    title: 'SOS on every trip',
    description:
      'One-tap emergency button with live location tracking, instant alerts to emergency contacts and local authorities.',
  },
  {
    id: 'route-monitoring',
    icon: 'bar-chart-outline',
    gradient: ['#10B981', '#2DD4BF'],
    title: 'Route monitoring',
    description:
      'AI-powered real-time route tracking detects deviations instantly and alerts our 24/7 safety operations center.',
  },
  {
    id: 'share-trip',
    icon: 'people-outline',
    gradient: ['#0EA5E9', '#38BDF8'],
    title: 'Share your trip',
    description:
      'Let trusted contacts follow your ride in real-time. Automatic trip sharing with your emergency circle.',
  },
  {
    id: 'rated',
    icon: 'star-outline',
    gradient: [colors.magenta, '#D946EF'],
    title: 'Rated after every ride',
    description:
      'Community-driven ratings and reviews ensure accountability. Low-rated captains face automatic review and removal.',
  },
];

function FeatureCard({ feature }: { feature: Feature }) {
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
      <View
        style={[
          styles.cardTint,
          hovered && { opacity: 0.05, backgroundColor: feature.gradient[0] },
        ]}
      />

      <LinearGradient
        colors={feature.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.iconWrap, hovered && styles.iconWrapHovered]}
      >
        <Ionicons name={feature.icon} size={22} color="#FFFFFF" />
      </LinearGradient>

      <Text style={[styles.cardTitle, hovered && { color: feature.gradient[0] }]}>{feature.title}</Text>
      <Text style={styles.cardDescription}>{feature.description}</Text>
    </View>
  );
}

export default function LadySafetyTrust() {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Ionicons name="shield-checkmark-outline" size={13} color="#BE185D" />
          <Text style={styles.badgeLabel}>Safety & Trust</Text>
        </View>
        <Text style={styles.heading}>
          Your safety is our <Text style={styles.headingAccent}>obsession</Text>
        </Text>
        <Text style={styles.lead}>
          Multiple layers of protection working together, so you never have to think about it.
        </Text>
      </View>

      <View style={styles.grid}>
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 24,
    paddingVertical: 56,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },

  header: { alignItems: 'center', maxWidth: 620, alignSelf: 'center', marginBottom: 44 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FCE7F3',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(224,22,108,0.2)',
  },
  badgeLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11.5,
    letterSpacing: 1,
    color: '#BE185D',
    textTransform: 'uppercase',
  },

  heading: {
    fontFamily: fonts.display,
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.6,
    color: colors.ink,
    textAlign: 'center',
    marginTop: 18,
  },
  headingAccent: { color: colors.magenta },
  lead: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 26,
    color: colors.bodyMutedOnLight,
    textAlign: 'center',
    marginTop: 14,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
  },
  card: {
    flexGrow: 1,
    flexBasis: 260,
    maxWidth: 320,
    borderRadius: 20,
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    position: 'relative',
    overflow: 'hidden',
    // @ts-ignore -- web-only transition, no-op on native
    transitionProperty: 'transform, box-shadow',
    // @ts-ignore -- web-only transition, no-op on native
    transitionDuration: '250ms',
  },
  cardHovered: {
    transform: [{ translateY: -6 }],
  },
  cardTint: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0,
    // @ts-ignore -- web-only transition, no-op on native
    transitionProperty: 'opacity',
    // @ts-ignore -- web-only transition, no-op on native
    transitionDuration: '400ms',
  },

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
  iconWrapHovered: {
    transform: [{ scale: 1.1 }],
  },

  cardTitle: {
    fontFamily: fonts.displayMedium,
    fontSize: 17,
    color: colors.ink,
    marginBottom: 8,
  },
  cardDescription: {
    fontFamily: fonts.body,
    fontSize: 13.5,
    lineHeight: 20,
    color: colors.bodyMutedOnLight,
  },
});