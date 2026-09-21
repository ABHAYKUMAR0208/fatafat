import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';

const BLUE = colors.accentBlue;

const PHASES: { icon: keyof typeof Ionicons.glyphMap; title: string; status: string; description: string; active?: boolean }[] = [
  { icon: 'checkmark-circle', title: 'Delhi NCR', status: 'Live now', description: 'Full operations across Delhi, Gurgaon, Noida and Faridabad.', active: true },
  { icon: 'time-outline', title: 'Mumbai, Bengaluru, Pune', status: 'Next up', description: 'Onboarding captains ahead of launch in each city.' },
  { icon: 'flag-outline', title: 'Hyderabad, Chennai & beyond', status: 'On the roadmap', description: 'Planned for a future phase as we grow city by city.' },
];

export default function ExpansionTimeline() {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Ionicons name="map-outline" size={13} color={BLUE} />
          <Text style={styles.badgeLabel}>EXPANSION ROADMAP</Text>
        </View>
        <Text style={styles.heading}>
          How we're <Text style={styles.headingAccent}>growing.</Text>
        </Text>
      </View>

      <View style={styles.timeline}>
        {PHASES.map((p, i) => (
          <MotiView
            key={p.title}
            from={{ opacity: 0, translateX: -16 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: 'timing', duration: 450, delay: i * 120 }}
            style={styles.phaseRow}
          >
            <View style={styles.markerCol}>
              <View style={[styles.markerDot, p.active && styles.markerDotActive]}>
                <Ionicons name={p.icon} size={16} color={p.active ? '#FFFFFF' : BLUE} />
              </View>
              {i < PHASES.length - 1 && <View style={styles.markerLine} />}
            </View>

            <View style={styles.phaseContent}>
              <View style={styles.phaseTop}>
                <Text style={styles.phaseTitle}>{p.title}</Text>
                <View style={[styles.statusPill, p.active && styles.statusPillActive]}>
                  <Text style={[styles.statusPillText, p.active && styles.statusPillTextActive]}>{p.status}</Text>
                </View>
              </View>
              <Text style={styles.phaseDescription}>{p.description}</Text>
            </View>
          </MotiView>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 24, paddingVertical: 40, maxWidth: 760, width: '100%', alignSelf: 'center' },
  header: { alignItems: 'center', marginBottom: 36 },
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

  timeline: { gap: 0 },
  phaseRow: { flexDirection: 'row', gap: 18 },
  markerCol: { alignItems: 'center' },
  markerDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.chipBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerDotActive: { backgroundColor: '#10B981' },
  markerLine: { width: 2, flex: 1, minHeight: 40, backgroundColor: 'rgba(51,80,222,0.15)', marginVertical: 4 },

  phaseContent: { flex: 1, paddingBottom: 28 },
  phaseTop: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 6 },
  phaseTitle: { fontFamily: fonts.displayMedium, fontSize: 16, color: colors.ink },
  statusPill: { backgroundColor: colors.chipBg, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 3 },
  statusPillActive: { backgroundColor: 'rgba(16,185,129,0.12)' },
  statusPillText: { fontFamily: fonts.bodyMedium, fontSize: 10.5, color: BLUE, textTransform: 'uppercase', letterSpacing: 0.5 },
  statusPillTextActive: { color: '#10B981' },
  phaseDescription: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: colors.bodyMutedOnLight },
});
