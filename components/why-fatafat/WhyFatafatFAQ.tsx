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

const WHY_FATAFAT_FAQS: FaqItem[] = [
  {
    id: 'fare-change',
    icon: 'pricetag-outline',
    question: 'Can my fare change mid-ride?',
    answer:
      'No. The fare you\u2019re shown before you book is exactly what you pay, regardless of traffic, detours, or how long the trip takes \u2014 unless the destination itself changes.',
  },
  {
    id: 'best-fare-how',
    icon: 'compass-outline',
    question: 'How does the Best Fare Promise actually work?',
    answer:
      'When you search a route, Fatafat checks auto, bike, scooty and car fares for that trip at once and puts the cheapest option first, so you never have to switch apps to compare.',
  },
  {
    id: 'safety-hub-scope',
    icon: 'shield-checkmark-outline',
    question: "What's included in the Safety Hub?",
    answer:
      'One-tap SOS that alerts responders and your emergency contacts, live trip sharing, ride playback after the trip, and ID verification for every captain on the platform.',
  },
  {
    id: 'insurance-cost',
    icon: 'umbrella-outline',
    question: 'Does captain insurance cost anything?',
    answer:
      'No \u2014 family health and accident coverage is included automatically from a captain\u2019s very first trip. There\u2019s no premium, no paperwork, and no waiting period.',
  },
  {
    id: 'applies-everywhere',
    icon: 'checkmark-done-outline',
    question: 'Do these promises apply to every ride type?',
    answer:
      'Yes \u2014 Fixed Fare, Best Fare, the Safety Hub and Captain Insurance apply across auto, bike, scooty, car, Carpool and Pink Ride bookings alike.',
  },
];

function FaqRow({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hoverHandlers = IS_WEB
    ? {
        // @ts-ignore -- web only pointer events
        onMouseEnter: () => setHovered(true),
        // @ts-ignore -- web only pointer events
        onMouseLeave: () => setHovered(false),
      }
    : {};
  const active = open || hovered;

  return (
    <View style={[styles.faqItem, open && styles.faqItemOpen]} {...hoverHandlers}>
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

export default function WhyFatafatFAQ() {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Ionicons name="help-circle-outline" size={13} color={BLUE} />
          <Text style={styles.badgeLabel}>FAQ</Text>
        </View>
        <Text style={styles.heading}>
          Questions about our <Text style={styles.headingAccent}>promises.</Text>
        </Text>
      </View>

      <View style={{ gap: 14, maxWidth: 780, alignSelf: 'center', width: '100%' }}>
        {WHY_FATAFAT_FAQS.map((item) => (
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
