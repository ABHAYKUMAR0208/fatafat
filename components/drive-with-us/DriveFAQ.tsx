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

const DRIVE_FAQS: FaqItem[] = [
  {
    id: 'documents',
    icon: 'document-text-outline',
    question: 'What documents do I need to sign up?',
    answer:
      'A valid driving licence, vehicle registration papers, a government ID and a recent photo. Everything is uploaded from the app \u2014 no paperwork needed in person.',
  },
  {
    id: 'verification-time',
    icon: 'time-outline',
    question: 'How long does verification take?',
    answer: 'Most captains are verified within 48 hours of submitting complete documents.',
  },
  {
    id: 'commission',
    icon: 'pricetag-outline',
    question: 'Is the 12% commission ever higher?',
    answer:
      'No \u2014 the commission is flat at 12% on every trip, regardless of demand, time of day, or vehicle type. There are no surge-time deductions.',
  },
  {
    id: 'multiple-vehicles',
    icon: 'car-outline',
    question: 'Can I drive more than one vehicle type?',
    answer:
      'Yes \u2014 one captain account covers auto, bike, scooty, car and parcel. Switch between them from the app whenever you like.',
  },
  {
    id: 'insurance-scope',
    icon: 'heart-outline',
    question: 'What does the family insurance cover?',
    answer:
      'Health and accident coverage for you and your immediate family, active from your very first completed trip \u2014 at no cost to you.',
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

export default function DriveFAQ() {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Ionicons name="help-circle-outline" size={13} color={AMBER} />
          <Text style={styles.badgeLabel}>FAQ</Text>
        </View>
        <Text style={styles.heading}>
          Questions from <Text style={styles.headingAccent}>captains.</Text>
        </Text>
      </View>

      <View style={{ gap: 14, maxWidth: 780, alignSelf: 'center', width: '100%' }}>
        {DRIVE_FAQS.map((item) => (
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
