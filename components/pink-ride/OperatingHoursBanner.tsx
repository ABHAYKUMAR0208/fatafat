import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';

function PulseClock() {
  return (
    <View style={styles.pulseWrap}>
      <MotiView
        style={styles.pulseRing}
        from={{ opacity: 0.55, scale: 1 }}
        animate={{ opacity: 0, scale: 1.9 }}
        transition={{ type: 'timing', duration: 2000, loop: true }}
      />
      <View style={styles.pulseCore}>
        <Ionicons name="time-outline" size={24} color="#FFFFFF" />
      </View>
    </View>
  );
}

export default function OperatingHoursBanner({ isDesktop }: { isDesktop: boolean }) {
  return (
    <View style={styles.section}>
      <LinearGradient
        colors={[colors.navy, '#1B1035', '#161F42']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.banner}
      >
        <View style={[styles.topRow, !isDesktop && styles.topRowStacked]}>
          <View style={styles.leftBlock}>
            <PulseClock />
            {!isDesktop ? (
              <View>
                <Text style={styles.eyebrow}>OPERATING WINDOW</Text>
                <Text style={styles.eyebrowValue}>7:45 AM – 8:00 PM</Text>
              </View>
            ) : null}
          </View>

          <View style={styles.middleBlock}>
            {isDesktop ? <Text style={styles.eyebrow}>OPERATING WINDOW</Text> : null}
            <Text style={styles.heading}>Both options run 7:45 AM to 8:00 PM, same day.</Text>
            <Text style={styles.body}>
              Lady Cab Driver and Pink Scooty are both bookable within this daily window — the last
              ride must be accepted by 8:00 PM. A ride already underway at the cut-off always
              completes normally; the window only limits new bookings.
            </Text>
          </View>

          <View style={[styles.statsGrid, !isDesktop && styles.statsGridStacked]}>
            <View style={styles.statTile}>
              <Text style={styles.statValue}>12h 15m</Text>
              <Text style={styles.statLabel}>Daily window</Text>
            </View>
            <View style={styles.statTile}>
              <Text style={styles.statValue}>8 PM</Text>
              <Text style={styles.statLabel}>Last pickup</Text>
            </View>
          </View>
        </View>

        <View style={[styles.ruleLine, !isDesktop && styles.ruleLineStacked]}>
          <View style={styles.ruleItem}>
            <Ionicons name="checkmark" size={14} color="rgba(255,255,255,0.6)" />
            <Text style={styles.ruleText}>Rides already in progress at cut-off complete normally.</Text>
          </View>
          <View style={styles.ruleItem}>
            <Ionicons name="time-outline" size={14} color="rgba(255,255,255,0.6)" />
            <Text style={styles.ruleText}>Window applies to new bookings only.</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 24, paddingVertical: 24, maxWidth: 1200, width: '100%', alignSelf: 'center' },

  banner: { borderRadius: 24, padding: 32 },

  topRow: { flexDirection: 'row', alignItems: 'center', gap: 32 },
  topRowStacked: { flexDirection: 'column', alignItems: 'flex-start', gap: 20 },

  leftBlock: { flexDirection: 'row', alignItems: 'center', gap: 16 },

  pulseWrap: { width: 56, height: 56, alignItems: 'center', justifyContent: 'center' },
  pulseRing: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.magenta,
  },
  pulseCore: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.magenta,
  },

  eyebrow: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 1.6,
    color: 'rgba(255,255,255,0.55)',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  eyebrowValue: {
    fontFamily: fonts.display,
    fontSize: 20,
    color: '#FFFFFF',
  },

  middleBlock: { flex: 1 },
  heading: {
    fontFamily: fonts.display,
    fontSize: 24,
    lineHeight: 30,
    color: '#FFFFFF',
    maxWidth: 520,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 12,
    maxWidth: 560,
  },

  statsGrid: { flexDirection: 'row', gap: 12, minWidth: 240 },
  statsGridStacked: { width: '100%' },
  statTile: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    borderRadius: 16,
    padding: 16,
  },
  statValue: { fontFamily: fonts.display, fontSize: 20, color: '#FFFFFF' },
  statLabel: { fontFamily: fonts.body, fontSize: 11.5, color: 'rgba(255,255,255,0.6)', marginTop: 4 },

  ruleLine: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 28,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.10)',
  },
  ruleLineStacked: { flexDirection: 'column' },
  ruleItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  ruleText: { fontFamily: fonts.body, fontSize: 12, color: 'rgba(255,255,255,0.6)' },
});