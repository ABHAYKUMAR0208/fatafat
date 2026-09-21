import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';

const BLUE = colors.accentBlue;

const CONTACTS: { icon: keyof typeof Ionicons.glyphMap; label: string; value: string; description: string }[] = [
  { icon: 'mail-outline', label: 'Support', value: 'support@fatafatapp.com', description: 'General questions, bookings and account help.' },
  { icon: 'shield-outline', label: 'Grievance Officer', value: 'grievance@fatafatapp.com', description: 'Formal complaints and escalations, per policy.' },
  { icon: 'document-text-outline', label: 'Policies', value: 'Terms, privacy & refund policy', description: 'Read the full terms governing your account.' },
];

export default function ContactSection() {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Ionicons name="chatbubbles-outline" size={13} color={BLUE} />
          <Text style={styles.badgeLabel}>STILL STUCK?</Text>
        </View>
        <Text style={styles.heading}>
          Reach us <Text style={styles.headingAccent}>directly.</Text>
        </Text>
      </View>

      <View style={styles.grid}>
        {CONTACTS.map((c) => (
          <View key={c.label} style={styles.card}>
            <View style={styles.iconWrap}>
              <Ionicons name={c.icon} size={20} color={BLUE} />
            </View>
            <Text style={styles.label}>{c.label}</Text>
            <Text style={styles.value}>{c.value}</Text>
            <Text style={styles.description}>{c.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 24, paddingVertical: 40, maxWidth: 1200, width: '100%', alignSelf: 'center' },
  header: { alignItems: 'center', marginBottom: 32 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.chipBg,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(51,80,222,0.18)',
    marginBottom: 18,
  },
  badgeLabel: { fontFamily: fonts.bodyMedium, fontSize: 11.5, letterSpacing: 1, color: BLUE },
  heading: { fontFamily: fonts.display, fontSize: 28, lineHeight: 34, letterSpacing: -0.6, color: colors.ink, textAlign: 'center' },
  headingAccent: { color: BLUE },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 18, justifyContent: 'center' },
  card: {
    flexGrow: 1,
    flexBasis: 240,
    maxWidth: 300,
    borderRadius: 20,
    padding: 24,
    backgroundColor: colors.navy,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  label: { fontFamily: fonts.bodyMedium, fontSize: 11, letterSpacing: 0.6, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 6 },
  value: { fontFamily: fonts.displayMedium, fontSize: 15.5, color: '#FFFFFF', marginBottom: 10 },
  description: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 19, color: 'rgba(255,255,255,0.55)' },
});
