import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';

const IS_WEB = Platform.OS === 'web';

type Promise = {
  id: string;
  number: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconBg: string;
  iconColor: string;
  accent: string;
  title: string;
  description: string;
  points: string[];
};

const PROMISES: Promise[] = [
  {
    id: 'fixed-fare',
    number: '01',
    icon: 'pricetag-outline',
    iconBg: colors.chipBg,
    iconColor: colors.accentBlue,
    accent: colors.accentBlue,
    title: 'Fixed Fare Promise',
    description:
      'Lock your fare before you ride. Surges, detours, and traffic will never change what you pay — the number you see is the number you owe.',
    points: ['Fare shown before you book', 'No surge multipliers, ever', 'Traffic and detours are on us'],
  },
  {
    id: 'best-fare',
    number: '02',
    icon: 'compass-outline',
    iconBg: '#FFF7E6',
    iconColor: colors.amber,
    accent: colors.amber,
    title: 'Best Fare Promise',
    description:
      "See the lowest fare across auto, bike, scooty and car in a single tap. If a cheaper option exists on the route, we'll show it first — every time.",
    points: ['All ride types compared at once', 'Cheapest option surfaced first', 'No hidden platform fees'],
  },
  {
    id: 'safety-hub',
    number: '03',
    icon: 'shield-checkmark-outline',
    iconBg: '#E7FBF3',
    iconColor: '#10B981',
    accent: '#10B981',
    title: 'Safety Hub',
    description:
      'One-tap SOS, live trip sharing with contacts, ride playback, and an always-on safety agent. Your ride is monitored end-to-end, automatically.',
    points: ['One-tap SOS to responders', 'Live trip sharing with contacts', 'Every driver ID-verified'],
  },
  {
    id: 'captain-insurance',
    number: '04',
    icon: 'umbrella-outline',
    iconBg: colors.chipBg,
    iconColor: colors.accentBlue,
    accent: colors.accentBlue,
    title: 'Captain Insurance',
    description:
      'Every captain gets family-grade health and accident coverage from the very first trip — at no cost, no paperwork, no waiting period.',
    points: ['Covered from trip one', 'Family health & accident cover', 'Zero paperwork, zero cost'],
  },
];

function PromiseCard({ item, index }: { item: Promise; index: number }) {
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
    <MotiView
      from={{ opacity: 0, translateY: 24 }}
      animate={{ opacity: 1, translateY: hovered ? -4 : 0 }}
      transition={{ type: 'timing', duration: hovered ? 200 : 500, delay: hovered ? 0 : index * 100 }}
      style={[styles.card, hovered && { borderColor: item.accent + '55' }]}
      {...hoverHandlers}
    >
      <View style={styles.cardTop}>
        <View style={[styles.iconWrap, { backgroundColor: item.iconBg }]}>
          <Ionicons name={item.icon} size={22} color={item.iconColor} />
        </View>
        <Text style={[styles.number, { color: item.accent }]}>{item.number}</Text>
      </View>

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>

      <View style={styles.pointList}>
        {item.points.map((p) => (
          <View key={p} style={styles.pointRow}>
            <Ionicons name="checkmark-circle" size={14} color={item.accent} />
            <Text style={styles.pointLabel}>{p}</Text>
          </View>
        ))}
      </View>
    </MotiView>
  );
}

export default function PromisesGrid() {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.heading}>
          Four promises. <Text style={styles.headingAccent}>Kept every ride.</Text>
        </Text>
        <Text style={styles.lead}>The commitments that shape every trip on Fatafat, for riders and captains alike.</Text>
      </View>

      <View style={styles.grid}>
        {PROMISES.map((item, i) => (
          <PromiseCard key={item.id} item={item} index={i} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 24, paddingVertical: 48, maxWidth: 1200, width: '100%', alignSelf: 'center' },
  header: { alignItems: 'center', maxWidth: 620, alignSelf: 'center', marginBottom: 40 },
  heading: {
    fontFamily: fonts.display,
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: -0.6,
    color: colors.ink,
    textAlign: 'center',
  },
  headingAccent: { color: colors.accentBlue },
  lead: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 24,
    color: colors.bodyMutedOnLight,
    textAlign: 'center',
    marginTop: 12,
  },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 20 },
  card: {
    flexGrow: 1,
    flexBasis: 260,
    maxWidth: 290,
    borderRadius: 22,
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(15,23,42,0.06)',
    shadowColor: colors.navy,
    shadowOpacity: 0.05,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
    // @ts-ignore -- web only
    transitionProperty: 'transform, border-color, box-shadow',
    // @ts-ignore -- web only
    transitionDuration: '220ms',
  },
  cardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  iconWrap: { width: 46, height: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  number: { fontFamily: fonts.display, fontSize: 20, opacity: 0.4 },
  title: { fontFamily: fonts.displayMedium, fontSize: 17, color: colors.ink, marginBottom: 10 },
  description: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: colors.bodyMutedOnLight, marginBottom: 16 },

  pointList: { gap: 8 },
  pointRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  pointLabel: { fontFamily: fonts.body, fontSize: 12.5, color: colors.ink, flex: 1 },
});
