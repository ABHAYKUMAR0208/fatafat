import { Ionicons } from '@expo/vector-icons';
import { AnimatePresence, MotiView } from 'moti';
import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';

const IS_WEB = Platform.OS === 'web';

type FaqItem = {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  question: string;
  answer: string;
};

const FAQS: FaqItem[] = [
  {
    id: 'group-booking',
    icon: 'people-outline',
    question: "Can I book a Lady Cab Driver if I'm travelling with my husband or son?",
    answer:
      'Yes, absolutely! As long as at least one passenger in the group is a woman, you can book a Lady Cab Driver for your trip. The service is designed to ensure female passengers always feel safe and comfortable during their ride.',
  },
  {
    id: 'why-stricter',
    icon: 'bicycle-outline',
    question: 'Why is Pink Scooty stricter than Lady Cab Driver?',
    answer:
      'Pink Scooty is exclusively for solo female riders, which is why we enforce stricter identity verification. Lady Cab Driver accommodates groups as long as at least one passenger is a woman, so the verification requirements are slightly more flexible.',
  },
  {
    id: 'after-hours',
    icon: 'time-outline',
    question: 'What if I need a ride after 8:00 PM?',
    answer:
      'Currently, Lady Rider services operate daily from 7:45 AM to 8:00 PM across Delhi NCR. For late-night rides, we recommend using our standard Fatafat service which is available 24/7. We are actively working to extend Lady Rider hours in the future.',
  },
  {
    id: 'fare-premium',
    icon: 'pricetag-outline',
    question: 'Do I pay more for a Lady Captain?',
    answer:
      'Not at all! There is no premium or extra charge for booking a Lady Captain. You pay the same fare as our standard rides. Our mission is to make safe, reliable transportation accessible and affordable for every woman.',
  },
  {
    id: 'become-captain',
    icon: 'person-add-outline',
    question: 'How do I become a Lady Captain?',
    answer:
      'To become a Lady Captain, you must be at least 21 years old with a valid driving license and a vehicle that meets our safety standards. You will also need to complete our verification process, which includes a background check and a medical fitness certificate. Apply through the app!',
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
    <View style={[styles.item, open && styles.itemOpen]} {...hoverHandlers}>
      <Pressable style={styles.trigger} onPress={() => setOpen((v) => !v)}>
        <View style={[styles.iconBadge, active && styles.iconBadgeActive]}>
          <Ionicons name={item.icon} size={19} color={active ? '#FFFFFF' : colors.magenta} />
        </View>
        <Text style={styles.question}>{item.question}</Text>
        <View style={[styles.chevronWrap, open && styles.chevronWrapOpen]}>
          <Ionicons name="chevron-down" size={18} color={colors.magenta} />
        </View>
      </Pressable>

      <AnimatePresence>
        {open ? (
          <MotiView
            from={{ opacity: 0, translateY: -6 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -6 }}
            transition={{ type: 'timing', duration: 220 }}
            style={styles.answerWrap}
          >
            <Text style={styles.answer}>{item.answer}</Text>
          </MotiView>
        ) : null}
      </AnimatePresence>
    </View>
  );
}

export default function LadyFAQ() {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Ionicons name="help-circle-outline" size={13} color="#BE185D" />
          <Text style={styles.badgeLabel}>FAQ</Text>
        </View>
        <Text style={styles.heading}>
          Common <Text style={styles.headingAccent}>questions</Text>
        </Text>
        <Text style={styles.lead}>
          Everything you need to know about the Lady Rider service. Can't find what you're looking
          for? Reach out to our support team.
        </Text>
      </View>

      <View style={styles.list}>
        {FAQS.map((item) => (
          <FaqRow key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 24,
    paddingVertical: 56,
    maxWidth: 900,
    width: '100%',
    alignSelf: 'center',
  },

  header: { alignItems: 'center', maxWidth: 580, alignSelf: 'center', marginBottom: 40 },
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

  list: { gap: 14 },

  item: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    // @ts-ignore -- web-only transition, no-op on native
    transitionProperty: 'border-color, box-shadow, background-color',
    // @ts-ignore -- web-only transition, no-op on native
    transitionDuration: '250ms',
  },
  itemOpen: {
    borderColor: 'rgba(224,22,108,0.3)',
    backgroundColor: '#FFF7FA',
  },

  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
  },

  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDF2F8',
    flexShrink: 0,
    // @ts-ignore -- web-only transition, no-op on native
    transitionProperty: 'background-color',
    // @ts-ignore -- web-only transition, no-op on native
    transitionDuration: '250ms',
  },
  iconBadgeActive: { backgroundColor: colors.magenta },

  question: {
    flex: 1,
    fontFamily: fonts.bodyMedium,
    fontSize: 14.5,
    lineHeight: 21,
    color: colors.ink,
  },

  chevronWrap: {
    flexShrink: 0,
    // @ts-ignore -- web-only transition, no-op on native
    transitionProperty: 'transform',
    // @ts-ignore -- web-only transition, no-op on native
    transitionDuration: '250ms',
  },
  chevronWrapOpen: { transform: [{ rotate: '180deg' }] },

  answerWrap: {
    paddingHorizontal: 20,
    paddingLeft: 76,
    paddingBottom: 20,
  },
  answer: {
    fontFamily: fonts.body,
    fontSize: 13.5,
    lineHeight: 21,
    color: colors.bodyMutedOnLight,
  },
});