import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';

const IS_WEB = Platform.OS === 'web';

type Rule = { title: string; body: string };

type OptionCard = {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  chipLabel: string;
  optionLabel: string;
  title: string;
  intro: string;
  rules: Rule[];
  footerChip: string;
  cta: string;
  accent: string;
  accentSoft: string;
  featured?: boolean;
  ribbon?: string;
};

const CARDS: OptionCard[] = [
  {
    id: 'lady-cab',
    icon: 'car-outline',
    chipLabel: 'CAB / CAR',
    optionLabel: '',
    title: 'Lady Cab Driver',
    intro: 'Choose a verified woman driver for your car booking. You can still travel as a group.',
    rules: [
      {
        title: 'Driver is a verified woman.',
        body: 'Every Lady Cab driver completes identity verification and a background check.',
      },
      {
        title: 'At least one passenger must be a woman.',
        body: 'Mixed groups — family, friends, colleagues — are welcome.',
      },
      {
        title: 'Bookable 7:45 AM – 8:00 PM, same day.',
        body: 'No advance reservations needed; the daily window is generous.',
      },
      {
        title: 'Same fixed-fare pricing — no premium.',
        body: 'Pay exactly what you would for any other Cab booking.',
      },
    ],
    footerChip: 'Same-day booking',
    cta: 'Book a Lady Cab',
    accent: colors.accentBlue,
    accentSoft: colors.chipBg,
  },
  {
    id: 'pink-scooty',
    icon: 'bicycle-outline',
    chipLabel: 'SCOOTY',
    optionLabel: '',
    title: 'Pink Scooty',
    intro: 'Our strictest option — built for a woman travelling alone with complete confidence.',
    rules: [
      {
        title: 'Driver is a verified woman — always.',
        body: "No exceptions, no substitutions. The rider sees the captain's photo before pickup.",
      },
      {
        title: 'Passenger must be a woman.',
        body: 'Pink Scooty carries one rider only, and that rider is always a woman.',
      },
      {
        title: '7:45 AM – 8:00 PM · trips capped at 30 km.',
        body: 'Perfect for daily commutes, errands, and city hops.',
      },
      {
        title: 'Same fixed-fare pricing as standard Scooty.',
        body: "Safety isn't a premium tier — it's a baseline.",
      },
    ],
    footerChip: 'Solo + verified',
    cta: 'Book a Pink Scooty',
    accent: colors.magenta,
    accentSoft: '#FCE7F3',
    featured: true,
    ribbon: 'MOST STRICT',
  },
];

const STRIP = [
  { label: 'PASSENGER RULE', value: '≥ 1 woman in group', highlight: false },
  { label: 'PASSENGER RULE', value: 'Solo woman only', highlight: true },
  { label: 'GROUP TRAVEL', value: 'Allowed', highlight: false },
  { label: 'FARE PREMIUM', value: 'None — never', highlight: false },
];

function RuleRow({ rule, index, accent }: { rule: Rule; index: number; accent: string }) {
  return (
    <View style={[styles.ruleRow, index === 0 && styles.ruleRowFirst]}>
      <View style={[styles.ruleIndex, { backgroundColor: `${accent}14` }]}>
        <Text style={[styles.ruleIndexText, { color: accent }]}>{index + 1}</Text>
      </View>
      <View style={styles.ruleTextWrap}>
        <Text style={styles.ruleTitle}>{rule.title}</Text>
        <Text style={styles.ruleBody}>{rule.body}</Text>
      </View>
    </View>
  );
}

function OptionCardView({ card, isDesktop }: { card: OptionCard; isDesktop: boolean }) {
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
    <View
      style={[
        styles.card,
        card.featured && styles.cardFeatured,
        !isDesktop && styles.cardStacked,
        hovered && styles.cardHovered,
      ]}
      {...hoverHandlers}
    >
      {card.ribbon ? (
        <View style={[styles.ribbon, { backgroundColor: card.accent }]}>
          <Text style={styles.ribbonText}>{card.ribbon}</Text>
        </View>
      ) : null}

      <View style={styles.cardHeaderRow}>
        <View style={styles.cardHeaderLeft}>
          <View style={[styles.iconWrap, { backgroundColor: card.accentSoft }]}>
            <Ionicons name={card.icon} size={22} color={card.accent} />
          </View>
          <View style={[styles.chip, { backgroundColor: card.accentSoft }]}>
            <Text style={[styles.chipText, { color: card.accent }]}>{card.chipLabel}</Text>
          </View>
        </View>
        <Text style={styles.optionLabel}>{card.optionLabel}</Text>
      </View>

      <Text style={styles.cardTitle}>{card.title}</Text>
      <Text style={styles.cardIntro}>{card.intro}</Text>

      <View style={styles.ruleList}>
        {card.rules.map((rule, i) => (
          <RuleRow key={rule.title} rule={rule} index={i} accent={card.accent} />
        ))}
      </View>

      <View style={styles.cardFooter}>
        <View style={[styles.footerChip, { backgroundColor: card.accentSoft }]}>
          <Ionicons name="time-outline" size={12} color={card.accent} />
          <Text style={[styles.footerChipText, { color: card.accent }]}>{card.footerChip}</Text>
        </View>
        <Pressable style={styles.cardCta}>
          <Text style={[styles.cardCtaText, { color: card.accent }]}>{card.cta}</Text>
          <Ionicons name="arrow-forward" size={14} color={card.accent} />
        </Pressable>
      </View>
    </View>
  );
}

export default function CompareOptions({ isDesktop }: { isDesktop: boolean }) {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <View style={styles.badgeDot} />
          <Text style={styles.badgeLabel}>TWO WAYS TO CHOOSE A WOMAN DRIVER</Text>
        </View>
        <Text style={styles.heading}>
          Lady Cab Driver, or Pink Scooty —{'\n'}
          <Text style={styles.headingAccent}>different rules for each.</Text>
        </Text>
        <Text style={styles.lead}>
          Both are optional, verified, and run within the same daily window. The passenger rule is
          what sets them apart.
        </Text>
      </View>

      <View style={[styles.cardsRow, !isDesktop && styles.cardsRowStacked]}>
        {CARDS.map((card) => (
          <OptionCardView key={card.id} card={card} isDesktop={isDesktop} />
        ))}
      </View>

      <View style={[styles.strip, !isDesktop && styles.stripStacked]}>
        {STRIP.map((tile, i) => (
          <View
            key={`${tile.label}-${i}`}
            style={[styles.stripTile, tile.highlight && styles.stripTileHighlight]}
          >
            <Text style={[styles.stripLabel, tile.highlight && styles.stripLabelHighlight]}>
              {tile.label}
            </Text>
            <Text style={[styles.stripValue, tile.highlight && styles.stripValueHighlight]}>
              {tile.value}
            </Text>
          </View>
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

  header: { alignItems: 'center', maxWidth: 640, alignSelf: 'center', marginBottom: 40 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FCE7F3',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(224,22,108,0.18)',
  },
  badgeDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.magenta },
  badgeLabel: { fontFamily: fonts.bodyMedium, fontSize: 11.5, letterSpacing: 1, color: '#BE185D' },

  heading: {
    fontFamily: fonts.display,
    fontSize: 36,
    lineHeight: 42,
    letterSpacing: -1,
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
    marginTop: 16,
  },

  cardsRow: { flexDirection: 'row', gap: 24, alignItems: 'stretch' },
  cardsRowStacked: { flexDirection: 'column' },

  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 28,
    position: 'relative',
    overflow: 'hidden',
    // @ts-ignore -- web-only transition, no-op on native
    transitionProperty: 'transform, box-shadow',
    // @ts-ignore -- web-only transition, no-op on native
    transitionDuration: '220ms',
  },
  cardStacked: { width: '100%' },
  cardFeatured: {
    backgroundColor: '#FFF5FA',
    borderColor: 'rgba(224,22,108,0.25)',
  },
  cardHovered: {
    transform: [{ translateY: -4 }],
  },

  ribbon: {
    position: 'absolute',
    top: 18,
    right: -34,
    transform: [{ rotate: '45deg' }],
    paddingVertical: 6,
    paddingHorizontal: 38,
  },
  ribbonText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 1.4,
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },

  cardHeaderRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  cardHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconWrap: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  chip: { borderRadius: 999, paddingVertical: 6, paddingHorizontal: 14 },
  chipText: { fontFamily: fonts.bodyMedium, fontSize: 11, letterSpacing: 1 },
  optionLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 1,
    color: colors.bodyMutedOnLight,
    textTransform: 'uppercase',
  },

  cardTitle: {
    fontFamily: fonts.display,
    fontSize: 26,
    color: colors.ink,
    marginTop: 22,
  },
  cardIntro: {
    fontFamily: fonts.body,
    fontSize: 14.5,
    lineHeight: 22,
    color: colors.bodyMutedOnLight,
    marginTop: 8,
  },

  ruleList: { marginTop: 22 },
  ruleRow: {
    flexDirection: 'row',
    gap: 14,
    paddingVertical: 13,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  ruleRowFirst: { borderTopWidth: 0 },
  ruleIndex: {
    width: 24,
    height: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  ruleIndexText: { fontFamily: fonts.bodyMedium, fontSize: 12 },
  ruleTextWrap: { flex: 1 },
  ruleTitle: { fontFamily: fonts.bodyMedium, fontSize: 14.5, color: colors.ink },
  ruleBody: { fontFamily: fonts.body, fontSize: 13, lineHeight: 19, color: colors.bodyMutedOnLight, marginTop: 3 },

  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  footerChipText: { fontFamily: fonts.bodyMedium, fontSize: 11.5 },
  cardCta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  cardCtaText: { fontFamily: fonts.bodyMedium, fontSize: 14 },

  strip: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 32,
  },
  stripStacked: { flexDirection: 'column' },
  stripTile: {
    flexGrow: 1,
    flexBasis: 220,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
  stripTileHighlight: {
    backgroundColor: '#FCE7F3',
    borderColor: 'rgba(224,22,108,0.25)',
  },
  stripLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 10.5,
    letterSpacing: 1,
    color: colors.bodyMutedOnLight,
    textTransform: 'uppercase',
  },
  stripLabelHighlight: { color: '#BE185D' },
  stripValue: { fontFamily: fonts.displayMedium, fontSize: 15, color: colors.ink, marginTop: 5 },
  stripValueHighlight: { color: '#BE185D' },
});