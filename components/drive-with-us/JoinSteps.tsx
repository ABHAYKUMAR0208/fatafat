import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';

const AMBER = colors.accentBlue;

const STEPS: { icon: keyof typeof Ionicons.glyphMap; title: string; description: string }[] = [
  { icon: 'document-text-outline', title: 'Submit your documents', description: 'ID, driving licence, vehicle papers and a photo — uploaded from the app in minutes.' },
  { icon: 'shield-checkmark-outline', title: 'Get verified', description: 'Our team checks documents and runs background verification, usually within 48 hours.' },
  { icon: 'car-outline', title: 'Go online', description: 'Pick your vehicle type, set your hours, and start accepting trips near you.' },
  { icon: 'wallet-outline', title: 'Get paid weekly', description: 'Track earnings live and receive your payout straight to UPI every Tuesday.' },
];

export default function JoinSteps() {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.heading}>
          Four steps to your <Text style={styles.headingAccent}>first trip.</Text>
        </Text>
        <Text style={styles.lead}>Most captains are verified and driving within two days of applying.</Text>
      </View>

      <View style={styles.stepsRow}>
        {STEPS.map((s, i) => (
          <MotiView
            key={s.title}
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 450, delay: i * 100 }}
            style={styles.stepCard}
          >
            <Text style={styles.stepNumber}>{`0${i + 1}`}</Text>
            <View style={styles.stepIcon}>
              <Ionicons name={s.icon} size={20} color={AMBER} />
            </View>
            <Text style={styles.stepTitle}>{s.title}</Text>
            <Text style={styles.stepDescription}>{s.description}</Text>
          </MotiView>
        ))}
      </View>

      <Pressable style={styles.cta}>
        <Text style={styles.ctaText}>Start your application</Text>
        <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 24, paddingVertical: 48, maxWidth: 1200, width: '100%', alignSelf: 'center', alignItems: 'center' },
  header: { alignItems: 'center', maxWidth: 620, marginBottom: 40 },
  heading: {
    fontFamily: fonts.display,
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: -0.6,
    color: colors.ink,
    textAlign: 'center',
  },
  headingAccent: { color: AMBER },
  lead: { fontFamily: fonts.body, fontSize: 15, lineHeight: 24, color: colors.bodyMutedOnLight, textAlign: 'center', marginTop: 12 },

  stepsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 20, width: '100%', justifyContent: 'center', marginBottom: 36 },
  stepCard: {
    flexGrow: 1,
    flexBasis: 220,
    maxWidth: 260,
    borderRadius: 20,
    padding: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(15,23,42,0.06)',
  },
  stepNumber: { fontFamily: fonts.display, fontSize: 22, color: AMBER, opacity: 0.5, marginBottom: 8 },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.chipBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  stepTitle: { fontFamily: fonts.displayMedium, fontSize: 15.5, color: colors.ink, marginBottom: 6 },
  stepDescription: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 19, color: colors.bodyMutedOnLight },

  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.navy,
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 26,
  },
  ctaText: { fontFamily: fonts.bodyMedium, fontSize: 15, color: '#FFFFFF' },
});
