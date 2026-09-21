import { Ionicons } from '@expo/vector-icons';
import { AnimatePresence, MotiView } from 'moti';
import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';

const IS_WEB = Platform.OS === 'web';

const BLUE = colors.accentBlue;
const BLUE_ICE = colors.chipBg;
const BLUE_BORDER = 'rgba(51,80,222,0.18)';
const GLASS_BG = 'rgba(255,255,255,0.66)';
const GLASS_BORDER = 'rgba(255,255,255,0.9)';
const GLASS_OPEN_BG = 'rgba(234,240,254,0.85)';

type FaqItem = { id: string; icon: keyof typeof Ionicons.glyphMap; question: string; answer: string };

const CARPOOL_FAQS: FaqItem[] = [
  {
    id: 'cancel',
    icon: 'close-circle-outline',
    question: 'Can I cancel a booking?',
    answer:
      'Yes \u2014 the refund depends on how much notice you give. Cancel more than 24 hours before departure for a full refund minus the service fee; 6\u201324 hours before for a 50% refund; inside 6 hours or a no-show, there\u2019s no refund, since the driver has already planned the trip around your seat.',
  },
  {
    id: 'driver-cancels',
    icon: 'return-up-back-outline',
    question: 'What if the driver cancels?',
    answer: 'You\u2019re never charged for a ride that doesn\u2019t happen, and any amount already paid is refunded in full.',
  },
  {
    id: 'vs-cab',
    icon: 'swap-horizontal-outline',
    question: 'How is this different from booking a car through Fatafat?',
    answer:
      'An on-demand Car booking is dispatched now, at a company-fixed fare, by a commercial driver. Carpool is a ride someone is already making between cities, published in advance, at a price the driver sets to share their costs.',
  },
  {
    id: 'choose',
    icon: 'people-outline',
    question: 'Can I choose who I ride with?',
    answer:
      'Yes \u2014 every listing shows the driver\u2019s name, rating, ride count and vehicle before you book, so you always know who you\u2019re travelling with.',
  },
  {
    id: 'distance',
    icon: 'map-outline',
    question: 'Is there a limit on trip distance?',
    answer:
      'Carpool is built for intercity travel with no fixed company-side distance cap \u2014 the route is defined by what the driver publishes.',
  },
];

function useHover() {
  const [hovered, setHovered] = useState(false);
  const handlers = IS_WEB
    ? {
        // @ts-ignore -- web only pointer events
        onMouseEnter: () => setHovered(true),
        // @ts-ignore -- web only pointer events
        onMouseLeave: () => setHovered(false),
      }
    : {};
  return { hovered, handlers };
}

function FaqRow({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  const { hovered, handlers } = useHover();
  const active = open || hovered;

  return (
    <View style={[styles.faqItem, open && styles.faqItemOpen]} {...handlers}>
      <Pressable style={styles.faqTrigger} onPress={() => setOpen((v) => !v)}>
        <View style={[styles.faqIconBadge, active && styles.faqIconBadgeActive]}>
          <Ionicons name={item.icon} size={18} color={active ? '#FFFFFF' : BLUE} />
        </View>
        <Text style={styles.faqQuestion}>{item.question}</Text>
        <View style={open ? { transform: [{ rotate: '180deg' }] } : undefined}>
          <Ionicons name="chevron-down" size={18} color={BLUE} />
        </View>
      </Pressable>

      <AnimatePresence>
        {open ? (
          <MotiView
            from={{ opacity: 0, translateY: -6 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -6 }}
            transition={{ type: 'timing', duration: 220 }}
            style={styles.faqAnswerWrap}
          >
            <Text style={styles.faqAnswer}>{item.answer}</Text>
          </MotiView>
        ) : null}
      </AnimatePresence>
    </View>
  );
}

export default function CarpoolFAQ() {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Ionicons name="help-circle-outline" size={13} color={BLUE} />
          <Text style={styles.badgeLabel}>FAQ</Text>
        </View>
        <Text style={styles.heading}>
          Common <Text style={styles.headingAccent}>questions.</Text>
        </Text>
        <Text style={styles.lead}>Everything you need to know about carpooling.</Text>
      </View>

      <View style={{ gap: 14, maxWidth: 780, alignSelf: 'center', width: '100%' }}>
        {CARPOOL_FAQS.map((item) => (
          <FaqRow key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 24, paddingVertical: 48, maxWidth: 1200, width: '100%', alignSelf: 'center' },

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

  faqItem: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: GLASS_BORDER,
    backgroundColor: GLASS_BG,
    overflow: 'hidden',
    // @ts-ignore -- web-only glass blur, no-op on native
    backdropFilter: IS_WEB ? 'blur(16px) saturate(150%)' : undefined,
    // @ts-ignore -- web-only transition, no-op on native
    transitionProperty: 'border-color, background-color',
    // @ts-ignore -- web-only transition, no-op on native
    transitionDuration: '250ms',
  },
  faqItemOpen: { borderColor: BLUE_BORDER, backgroundColor: GLASS_OPEN_BG },
  faqTrigger: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 18, paddingHorizontal: 20 },
  faqIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BLUE_ICE,
    flexShrink: 0,
    // @ts-ignore -- web-only transition, no-op on native
    transitionProperty: 'background-color',
    // @ts-ignore -- web-only transition, no-op on native
    transitionDuration: '250ms',
  },
  faqIconBadgeActive: { backgroundColor: BLUE },
  faqQuestion: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 14.5, lineHeight: 21, color: colors.ink },
  faqAnswerWrap: { paddingHorizontal: 20, paddingLeft: 76, paddingBottom: 20 },
  faqAnswer: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: colors.bodyMutedOnLight },
});