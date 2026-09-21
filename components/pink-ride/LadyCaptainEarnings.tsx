import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';

const IS_WEB = Platform.OS === 'web';

type Benefit = {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
};

const BENEFITS: Benefit[] = [
  {
    id: 'payouts',
    icon: 'cash-outline',
    title: 'Weekly payouts',
    description:
      'Transparent earnings with direct bank transfers every week. Track every penny in real-time from your dashboard.',
    stat: '₨ 8000',
    statLabel: 'Avg. weekly earnings',
  },
  {
    id: 'insurance',
    icon: 'heart-outline',
    title: 'Family insurance',
    description:
      'Comprehensive health and life insurance for you and your family, active after your second month on the platform.',
    stat: '100%',
    statLabel: 'Covered from month 2',
  },
  {
    id: 'hours',
    icon: 'calendar-outline',
    title: 'She sets her hours',
    description: 'Complete flexibility to choose when, where, and how long you drive. No minimum hours, no penalties.',
    stat: '24/7',
    statLabel: 'Flexible scheduling',
  },
  {
    id: 'bonuses',
    icon: 'star-outline',
    title: 'Performance bonuses',
    description:
      'Earn extra through ride streaks, peak-hour multipliers, referral bonuses, and monthly captain reward tiers.',
    stat: '3x',
    statLabel: 'Peak bonus multiplier',
  },
];

function BenefitCard({ item }: { item: Benefit }) {
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
      <View style={styles.cardBody}>
        {hovered ? (
          <LinearGradient
            colors={[colors.magenta, '#F43F5E']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconWrap}
          >
            <Ionicons name={item.icon} size={22} color="#FFFFFF" />
          </LinearGradient>
        ) : (
          <View style={[styles.iconWrap, styles.iconWrapIdle]}>
            <Ionicons name={item.icon} size={22} color={colors.magenta} />
          </View>
        )}

        <Text style={[styles.cardTitle, hovered && { color: '#BE185D' }]}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>

        <View style={styles.statBlock}>
          <Text style={styles.statValue}>{item.stat}</Text>
          <Text style={styles.statLabel}>{item.statLabel}</Text>
        </View>
      </View>
    </View>
  );
}

export default function LadyCaptainEarnings({ isDesktop }: { isDesktop: boolean }) {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Ionicons name="sparkles-outline" size={13} color="#BE185D" />
          <Text style={styles.badgeLabel}>For Every Lady Captain</Text>
        </View>
        <Text style={styles.heading}>
          A real path to <Text style={styles.headingAccent}>financial independence</Text>
        </Text>
        <Text style={styles.lead}>
          Flexible hours, guaranteed earnings, insurance coverage — everything you need to build a
          career on your own terms.
        </Text>
      </View>

      <View style={[styles.grid, !isDesktop && styles.gridStacked]}>
        {BENEFITS.map((item) => (
          <BenefitCard key={item.id} item={item} />
        ))}
      </View>

      <View style={styles.ctaWrap}>
        <Pressable style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Start earning today</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.ctaSub}>No fees to sign up. Start in under 48 hours.</Text>
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

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 20 },
  gridStacked: { flexDirection: 'column' },

  card: {
    flexGrow: 1,
    flexBasis: 250,
    maxWidth: 300,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    // @ts-ignore -- web-only transition, no-op on native
    transitionProperty: 'transform, box-shadow',
    // @ts-ignore -- web-only transition, no-op on native
    transitionDuration: '280ms',
  },
  cardHovered: {
    transform: [{ translateY: -8 }],
  },

  bar: {
    height: 5,
    width: '100%',
    opacity: 0.25,
    // @ts-ignore -- web-only transition, no-op on native
    transitionProperty: 'opacity',
    // @ts-ignore -- web-only transition, no-op on native
    transitionDuration: '400ms',
  },
  barVisible: { opacity: 1 },

  cardBody: { padding: 24 },

  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  iconWrapIdle: {
    backgroundColor: '#FDF2F8',
    borderWidth: 1,
    borderColor: '#FCE7F3',
  },

  cardTitle: { fontFamily: fonts.displayMedium, fontSize: 17, color: colors.ink, marginBottom: 8 },
  cardDescription: {
    fontFamily: fonts.body,
    fontSize: 13.5,
    lineHeight: 20,
    color: colors.bodyMutedOnLight,
    marginBottom: 20,
  },

  statBlock: { paddingTop: 16, borderTopWidth: 1, borderTopColor: colors.border },
  statValue: { fontFamily: fonts.display, fontSize: 22, color: colors.magenta },
  statLabel: { fontFamily: fonts.body, fontSize: 11.5, color: colors.bodyMutedOnLight, marginTop: 3 },

  ctaWrap: { alignItems: 'center', marginTop: 44 },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.magenta,
    borderRadius: 999,
    paddingVertical: 18,
    paddingHorizontal: 36,
  },
  ctaButtonText: { fontFamily: fonts.bodyMedium, fontSize: 16, color: '#FFFFFF' },
  ctaSub: { fontFamily: fonts.body, fontSize: 13, color: colors.bodyMutedOnLight, marginTop: 14 },
});