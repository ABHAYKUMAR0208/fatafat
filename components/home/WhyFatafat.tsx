import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';

type Feature = {
  id: string;
  number: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconBg: string;
  iconColor: string;
  accent: string;
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    id: 'fixed-fare',
    number: '01',
    icon: 'checkmark-circle-outline',
    iconBg: colors.chipBg,
    iconColor: colors.accentBlue,
    accent: colors.accentBlue,
    title: 'Fixed Fare Promise',
    description:
      'Lock your fare before you ride. Surges, detours, and traffic will never change what you pay — the number you see is the number you owe.',
  },
  {
    id: 'best-fare',
    number: '02',
    icon: 'compass-outline',
    iconBg: '#EAF0FE',
    iconColor: colors.secondaryBlue,
    accent: colors.secondaryBlue,
    title: 'Best Fare Promise',
    description:
      "See the lowest fare across auto, bike, scooty and car in a single tap. If a cheaper option exists on the route, we'll show it first — every time.",
  },
  {
    id: 'safety-hub',
    number: '03',
    icon: 'shield-checkmark-outline',
    iconBg: '#EAF0FE',
    iconColor: '#5B8DEF',
    accent: '#5B8DEF',
    title: 'Safety Hub',
    description:
      'One-tap SOS, live trip sharing with contacts, ride playback, and an always-on safety agent. Your ride is monitored end-to-end, automatically.',
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
  },
];

const IS_WEB = Platform.OS === 'web';

const CHECKLIST = [
  'Weekly payouts every Tuesday at 6 AM, directly to UPI',
  'Flat 12% commission — no surge cuts, no peak-time deductions',
  'Free family health & accident insurance from your first trip',
];

function useCountUp(target: number, active: boolean, duration = 1400, startFrom?: number) {
  const [value, setValue] = useState(startFrom ?? 0);
  const startRef = useRef(startFrom ?? 0);

  useEffect(() => {
    if (!active) return;
    const from = startRef.current;
    let raf: number;
    const start = Date.now();
    const tick = () => {
      const t = Math.min(1, (Date.now() - start) / duration);
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t); // easeOutExpo
      setValue(Math.round(from + (target - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return value;
}

function DriveStatsCard() {
  const [active, setActive] = useState(false);
  const containerRef = useRef<View>(null);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      // Native fallback: no scroll-visibility API here, just animate shortly after mount.
      const t = setTimeout(() => setActive(true), 150);
      return () => clearTimeout(t);
    }

    // @ts-ignore - on web, the View ref is the underlying DOM node
    const node = containerRef.current as unknown as HTMLElement | null;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const startEarnings = useRef(Math.floor(2500 + Math.random() * 1300)).current; // random 2500-3800
  const earnings = useCountUp(4320, active, 1400, startEarnings);
  const jobs = useCountUp(41, active);

  const floatY = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatY, {
          toValue: 1,
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatY, {
          toValue: 0,
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [floatY]);

  const translateY = floatY.interpolate({ inputRange: [0, 1], outputRange: [0, -10] });

  return (
    <View ref={containerRef} style={styles.statsWrap}>
      <View style={[styles.chip, styles.chip1]}>
        <View style={styles.chipIcon}>
          <Ionicons name="trending-up" size={13} color="#FFFFFF" />
        </View>
        <Text style={styles.chipText}>Payout sent · ₹4,320</Text>
      </View>

      <View style={[styles.chip, styles.chip2]}>
        <View style={styles.chipIcon}>
          <Ionicons name="star" size={13} color="#FFFFFF" />
        </View>
        <Text style={styles.chipText}>Top captain this week</Text>
      </View>

      <Animated.View style={[styles.statsCard, { transform: [{ translateY }] }]}>
        <Text style={styles.statsLabel}>THIS WEEK</Text>
        <Text style={styles.statsEarnings}>
          <Text style={styles.rupee}>₹</Text>
          {earnings.toLocaleString('en-IN')}
        </Text>
        <Text style={styles.statsWeek}>Earnings after 41 jobs · paid out Tue, 6 AM</Text>

        <View style={styles.statsDivider} />

        <View style={styles.statRow}>
          <Text style={styles.statKey}>Jobs completed</Text>
          <Text style={styles.statValue}>{jobs}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statKey}>Family insurance</Text>
          <View style={styles.pillActive}>
            <View style={styles.liveDot} />
            <Text style={styles.pillActiveText}>Active</Text>
          </View>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statKey}>Rating</Text>
          <Text style={styles.statValue}>
            4.92 ★ <Text style={styles.statValueMuted}>(312 rides)</Text>
          </Text>
        </View>
        <View style={[styles.statRow, { marginBottom: 0 }]}>
          <Text style={styles.statKey}>Next payout</Text>
          <Text style={styles.statValue}>Tue, 6 AM</Text>
        </View>
      </Animated.View>
    </View>
  );
}

function DriveWithUs() {
  return (
    <LinearGradient
      colors={['#0B1437', '#13205A', '#1E2F73']}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 0.9, y: 1 }}
      style={styles.drive}
    >
      <View style={styles.driveInner}>
        <View style={styles.driveCopy}>
          <View style={[styles.badge, styles.badgeDark]}>
            <View style={[styles.badgeDot, styles.badgeDotAmber]} />
            <Text style={[styles.badgeLabel, styles.badgeLabelAmber]}>FOR CAPTAINS</Text>
          </View>

          <Text style={styles.driveHeading}>
            Drive with Fatafat,{'\n'}
            <Text style={styles.driveHeadingAmber}>earn every week</Text>
          </Text>

          <Text style={styles.driveLead}>
            Transparent commission, weekly payouts, and family insurance — for auto, bike,
            scooty, car and parcel captains alike. No surge games, no hidden cuts.
          </Text>

          <View style={styles.checklist}>
            {CHECKLIST.map((item) => (
              <View key={item} style={styles.checklistRow}>
                <View style={styles.tick}>
                  <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                </View>
                <Text style={styles.checklistText}>{item}</Text>
              </View>
            ))}
          </View>

          <View style={styles.driveCta}>
            <Text style={styles.driveCtaText}>Register as a captain</Text>
            <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
          </View>
        </View>

        <DriveStatsCard />
      </View>
    </LinearGradient>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const [hovered, setHovered] = useState(false);

  const hoverHandlers = IS_WEB
    ? {
        // @ts-ignore - web only pointer events
        onMouseEnter: () => setHovered(true),
        // @ts-ignore - web only pointer events
        onMouseLeave: () => setHovered(false),
      }
    : {};

  return (
    <View
      style={[styles.card, hovered && styles.cardHovered]}
      {...hoverHandlers}
    >
      <Text style={styles.cardNumber}>{feature.number}</Text>

      <View style={[styles.iconWrap, { backgroundColor: feature.iconBg }]}>
        <Ionicons name={feature.icon} size={24} color={feature.iconColor} />
      </View>

      <Text style={styles.cardTitle}>{feature.title}</Text>
      <Text style={styles.cardDescription}>{feature.description}</Text>

      <View style={styles.learnMoreRow}>
        <Text style={[styles.learnMore, { color: feature.accent }]}>Learn more</Text>
        <Ionicons name="arrow-forward" size={14} color={feature.accent} />
      </View>
    </View>
  );
}

export default function WhyFatafat() {
  return (
    <View style={styles.section}>
      <View style={styles.badge}>
        <View style={styles.badgeDot} />
        <Text style={styles.badgeLabel}>WHY FATAFAT</Text>
      </View>

      <Text style={styles.heading}>
        Built around{' '}
        <Text style={styles.headingGradientWord}>fairness and safety</Text>
      </Text>

      <Text style={styles.subheading}>
        Every ride on Fatafat is shaped by four promises — transparent pricing,
        guaranteed best fares, a built-in safety hub, and family-grade
        insurance for every captain on the road.
      </Text>

      <View style={styles.grid}>
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </View>

      <DriveWithUs />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: 64,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: colors.paper,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.chipBg,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginBottom: 20,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accentBlue,
  },
  badgeLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    letterSpacing: 1,
    color: colors.accentBlue,
  },
  heading: {
    fontFamily: fonts.display,
    fontSize: 34,
    lineHeight: 40,
    color: colors.ink,
    textAlign: 'center',
    maxWidth: 480,
  },
  headingGradientWord: {
    color: colors.accentBlue,
  },
  subheading: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 23,
    color: colors.bodyMutedOnLight,
    textAlign: 'center',
    maxWidth: 560,
    marginTop: 16,
    marginBottom: 44,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
    width: '100%',
    maxWidth: 1200,
  },
  card: {
    flexGrow: 1,
    flexBasis: 250,
    maxWidth: 280,
    borderRadius: 20,
    padding: 26,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15,23,42,0.06)',
    shadowColor: '#0F172A',
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
    // @ts-ignore - web only
    transitionProperty: 'transform, box-shadow',
    // @ts-ignore - web only
    transitionDuration: '250ms',
    // @ts-ignore - web only
    transitionTimingFunction: 'ease',
  },
  cardHovered: {
    transform: [{ translateY: -6 }],
    shadowOpacity: 0.14,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 16 },
  },
  cardNumber: {
    position: 'absolute',
    top: 18,
    right: 20,
    fontFamily: fonts.display,
    fontSize: 13,
    letterSpacing: 0.5,
    color: colors.ink,
    opacity: 0.12,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  cardTitle: {
    fontFamily: fonts.displayMedium,
    fontSize: 18,
    color: colors.ink,
    marginBottom: 8,
  },
  cardDescription: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: colors.bodyMutedOnLight,
    marginBottom: 18,
  },
  learnMoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  learnMore: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
  },

  // ===== Drive with Fatafat (dark section) =====
  drive: {
    width: '100%',
    maxWidth: 1200,
    borderRadius: 28,
    marginTop: 56,
    overflow: 'hidden',
  },
  driveInner: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 48,
    paddingVertical: 64,
    paddingHorizontal: 40,
  },
  driveCopy: {
    flexGrow: 1,
    flexBasis: 320,
    maxWidth: 480,
  },
  badgeDark: {
    backgroundColor: 'rgba(51,80,222,0.14)',
  },
  badgeDotAmber: {
    backgroundColor: '#1E9BE0',
  },
  badgeLabelAmber: {
    color: '#8FC6FF',
  },
  driveHeading: {
    fontFamily: fonts.display,
    fontSize: 32,
    lineHeight: 38,
    color: '#FFFFFF',
    marginTop: 18,
    marginBottom: 16,
  },
  driveHeadingAmber: {
    color: '#8FC6FF',
  },
  driveLead: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 24,
    color: '#CBD5E0',
    marginBottom: 26,
  },
  checklist: {
    gap: 14,
    marginBottom: 28,
  },
  checklistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tick: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1E9BE0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checklistText: {
    flex: 1,
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: '#E2E8F0',
  },
  driveCta: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 8,
    backgroundColor: '#1E9BE0',
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 22,
  },
  driveCtaText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: '#FFFFFF',
  },

  // ===== Floating stats card =====
  statsWrap: {
    flexGrow: 1,
    flexBasis: 300,
    maxWidth: 380,
    paddingTop: 24,
    paddingBottom: 12,
  },
  statsCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    padding: 26,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 24 },
    elevation: 10,
    // @ts-ignore - web only glass blur
    backdropFilter: IS_WEB ? 'blur(18px) saturate(160%)' : undefined,
  },
  statsLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 1.5,
    color: '#A0AEC0',
  },
  statsEarnings: {
    fontFamily: fonts.display,
    fontSize: 40,
    color: '#FFFFFF',
    marginTop: 6,
    marginBottom: 4,
  },
  rupee: {
    color: '#8FC6FF',
  },
  statsWeek: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: '#A0AEC0',
    marginBottom: 20,
  },
  statsDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: 18,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statKey: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: '#A0AEC0',
  },
  statValue: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: '#FFFFFF',
  },
  statValueMuted: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: '#A0AEC0',
  },
  pillActive: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(91,141,239,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(91,141,239,0.3)',
    borderRadius: 999,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#5B8DEF',
  },
  pillActiveText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    color: '#5B8DEF',
  },
  chip: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
    zIndex: 2,
  },
  chip1: {
    top: 0,
    right: 12,
  },
  chip2: {
    bottom: 0,
    left: -8,
  },
  chipIcon: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: '#1E9BE0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    color: '#E2E8F0',
  },
});