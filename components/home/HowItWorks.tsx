import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';

type Step = {
  id: string;
  number: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconBg: string;
  iconColor: string;
  accent: string;
  cardBg: string;
  bgImage: any;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    id: 'destination',
    number: '01',
    icon: 'location-outline',
    iconBg: colors.chipBg,
    iconColor: colors.accentBlue,
    accent: colors.accentBlue,
    cardBg: '#FFFFFF',
    bgImage: require('../../assets/illustrations/set-your-destination-bg.png'),
    title: 'Set your destination',
    description:
      'See every vehicle option and its fixed fare before you confirm. No hidden charges, no surprises — just transparent pricing upfront so you can ride with confidence.',
  },
  {
    id: 'track',
    number: '02',
    icon: 'wifi-outline',
    iconBg: colors.chipBg,
    iconColor: colors.accentBlue,
    accent: colors.accentBlue,
    cardBg: '#FFFFFF',
    bgImage: require('../../assets/illustrations/track-live-bg.png'),
    title: 'Track your captain live',
    description:
      'Share your trip in real-time with friends and family. Get instant safety alerts if the route changes unexpectedly, keeping you secure throughout your journey.',
  },
  {
    id: 'pay',
    number: '03',
    icon: 'wallet-outline',
    iconBg: '#EAF0FE',
    iconColor: colors.secondaryBlue,
    accent: colors.secondaryBlue,
    cardBg: '#FFFFFF',
    bgImage: require('../../assets/illustrations/payment-cards-bg.png'),
    title: 'Pay and rate',
    description:
      'Choose from UPI, card, or cash — then rate your captain in one tap. Your feedback helps us improve the experience for millions of riders.',
  },
];

const BADGES: { icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
  { icon: 'shield-checkmark-outline', label: 'Safety first' },
  { icon: 'flash-outline', label: 'Instant confirmation' },
  { icon: 'card-outline', label: 'No hidden fees' },
];

const IS_WEB = Platform.OS === 'web';

function StepCard({ step }: { step: Step }) {
  const [hovered, setHovered] = useState(false);

  const hoverHandlers = IS_WEB
    ? {
        // @ts-ignore - web only pointer events
        onMouseEnter: () => setHovered(true),
        // @ts-ignore - web only pointer events
        onMouseLeave: () => setHovered(false),
      }
    : {};

  return (
    <View
      style={[styles.card, hovered && styles.cardHovered]}
      {...hoverHandlers}
    >
      <Image source={step.bgImage} resizeMode="cover" style={styles.cardBgImage} />
      <View style={styles.cardOverlay} />

      <View style={styles.cardTop}>
        <View style={[styles.iconWrap, { backgroundColor: step.iconBg }]}>
          <Ionicons name={step.icon} size={22} color={step.iconColor} />
        </View>
        <Text style={styles.number}>{step.number}</Text>
      </View>

      <Text style={styles.cardTitle}>{step.title}</Text>
      <Text style={styles.cardDescription}>{step.description}</Text>

      <View style={styles.learnMoreRow}>
        <Text style={[styles.learnMore, { color: step.accent }]}>Learn more</Text>
        <View style={[styles.arrowCircle, { borderColor: step.accent }]}>
          <Ionicons name="arrow-forward" size={14} color={step.accent} />
        </View>
      </View>
    </View>
  );
}

export default function HowItWorks() {
  return (
    <View style={styles.section}>
      <View style={styles.badge}>
        <Ionicons name="flash" size={13} color={colors.accentBlue} />
        <Text style={styles.badgeLabel}>HOW IT WORKS</Text>
      </View>

      <Text style={styles.heading}>
              Book in
              <Text style={styles.headingGradientWord}> Seconds</Text>
            </Text>

      <Text style={styles.subheading}>
        Three simple steps to get moving. From booking to payment, everything is
        designed to be fast, safe, and hassle-free.
      </Text>

      <View style={styles.grid}>
        {STEPS.map((step) => (
          <StepCard key={step.id} step={step} />
        ))}
      </View>

      <View style={styles.badgeRow}>
        {BADGES.map((b, i) => (
          <React.Fragment key={b.label}>
            <View style={styles.miniBadge}>
              <View style={styles.miniBadgeIcon}>
                <Ionicons name={b.icon} size={14} color={colors.ink} />
              </View>
              <Text style={styles.miniBadgeLabel}>{b.label}</Text>
            </View>
            {i < BADGES.length - 1 && <View style={styles.badgeDivider} />}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: 56,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: colors.cloud,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.chipBg,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginBottom: 20,
  },
  badgeLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    letterSpacing: 0.5,
    color: colors.accentBlue,
  },
  heading: {
    fontFamily: fonts.display,
    fontSize: 34,
    color: colors.ink,
    textAlign: 'center',
  },
  headingGradientWord: {
    color: colors.accentBlue,
  },
  headingUnderline: {
    textDecorationLine: 'underline',
    textDecorationColor: colors.accentBlue,
  },
  subheading: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 23,
    color: colors.bodyMutedOnLight,
    textAlign: 'center',
    maxWidth: 560,
    marginTop: 14,
    marginBottom: 40,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
    width: '100%',
    maxWidth: 1100,
  },
  card: {
    flexGrow: 1,
    flexBasis: 280,
    maxWidth: 340,
    borderRadius: 18,
    padding: 24,
    overflow: 'hidden',
    zIndex: 0,
    // @ts-ignore - web only
    transitionProperty: 'transform, box-shadow',
    // @ts-ignore - web only
    transitionDuration: '250ms',
    // @ts-ignore - web only
    transitionTimingFunction: 'ease',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  cardHovered: {
    transform: [{ translateY: -6 }],
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 14 },
  },
  cardBgImage: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 18,
    opacity: 0.4,
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontFamily: fonts.display,
    fontSize: 34,
    color: 'rgba(27, 16, 53, 0.08)',
  },
  cardTitle: {
    fontFamily: fonts.display,
    fontSize: 19,
    color: colors.ink,
    marginBottom: 10,
  },
  cardDescription: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    lineHeight: 22,
    color: colors.ink,
  },
  learnMoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
  },
  learnMore: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
  },
  arrowCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginTop: 48,
  },
  miniBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 12,
  },
  miniBadgeIcon: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniBadgeLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: colors.ink,
  },
  badgeDivider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(27, 16, 53, 0.1)',
  },
});