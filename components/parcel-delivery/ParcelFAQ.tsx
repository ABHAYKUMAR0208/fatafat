import { Ionicons } from '@expo/vector-icons';
import { AnimatePresence, MotiView } from 'moti';
import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';

const IS_WEB = Platform.OS === 'web';

const AMBER = colors.accentBlue;
const AMBER_ICE = colors.chipBg;
const AMBER_BORDER = 'rgba(51,80,222,0.18)';
const GLASS_BG = 'rgba(255,255,255,0.66)';
const GLASS_BORDER = 'rgba(255,255,255,0.9)';
const GLASS_OPEN_BG = 'rgba(234,240,254,0.85)';

type FaqItem = { id: string; icon: keyof typeof Ionicons.glyphMap; question: string; answer: string };

const PARCEL_FAQS: FaqItem[] = [
  {
    id: 'cancel',
    icon: 'close-circle-outline',
    question: 'Can I cancel a parcel booking?',
    answer:
      'Yes \u2014 free before a captain accepts. Once a captain is on the way, a small cancellation fee may apply to cover their travel to the pickup point.',
  },
  {
    id: 'recipient-unavailable',
    icon: 'person-remove-outline',
    question: "What if the recipient isn't available?",
    answer:
      'The captain will wait a short window and try to reach the recipient. If no one can accept it, the parcel is returned to the sender and a return fee may apply.',
  },
  {
    id: 'prohibited',
    icon: 'ban-outline',
    question: 'What can\u2019t I send?',
    answer:
      'Cash, jewellery over the declared-value limit, weapons, live animals, perishables, and any hazardous or illegal item are not eligible for Parcel delivery.',
  },
  {
    id: 'damage',
    icon: 'alert-circle-outline',
    question: 'What happens if my parcel is damaged or lost?',
    answer:
      'If you declared a value at booking, the parcel is covered for loss or damage in transit, subject to policy limits \u2014 file a claim in-app with your photo proof.',
  },
  {
    id: 'tracking',
    icon: 'navigate-outline',
    question: 'Can I track the parcel in real time?',
    answer:
      'Yes \u2014 the captain\u2019s location is visible on the map from the moment they accept the pickup until delivery is confirmed.',
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
          <Ionicons name={item.icon} size={18} color={active ? '#FFFFFF' : AMBER} />
        </View>
        <Text style={styles.faqQuestion}>{item.question}</Text>
        <View style={open ? { transform: [{ rotate: '180deg' }] } : undefined}>
          <Ionicons name="chevron-down" size={18} color={AMBER} />
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

export default function ParcelFAQ() {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Ionicons name="help-circle-outline" size={13} color={AMBER} />
          <Text style={styles.badgeLabel}>FAQ</Text>
        </View>
        <Text style={styles.heading}>
          Common <Text style={styles.headingAccent}>questions.</Text>
        </Text>
        <Text style={styles.lead}>Everything you need to know about sending a parcel.</Text>
      </View>

      <View style={{ gap: 14, maxWidth: 780, alignSelf: 'center', width: '100%' }}>
        {PARCEL_FAQS.map((item) => (
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
  faqItemOpen: { borderColor: AMBER_BORDER, backgroundColor: GLASS_OPEN_BG },
  faqTrigger: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 18, paddingHorizontal: 20 },
  faqIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AMBER_ICE,
    flexShrink: 0,
    // @ts-ignore -- web-only transition, no-op on native
    transitionProperty: 'background-color',
    // @ts-ignore -- web-only transition, no-op on native
    transitionDuration: '250ms',
  },
  faqIconBadgeActive: { backgroundColor: AMBER },
  faqQuestion: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 14.5, lineHeight: 21, color: colors.ink },
  faqAnswerWrap: { paddingHorizontal: 20, paddingLeft: 76, paddingBottom: 20 },
  faqAnswer: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: colors.bodyMutedOnLight },
});
