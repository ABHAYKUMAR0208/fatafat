import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';

const IS_WEB = Platform.OS === 'web';

type Requirement = {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
};

const REQUIREMENTS: Requirement[] = [
  {
    id: 'age',
    icon: 'time-outline',
    title: '18 years or older',
    description: 'Must present a government-issued ID for age verification during the onboarding process.',
  },
  {
    id: 'licence',
    icon: 'checkmark-done-outline',
    title: 'Valid driving licence',
    description: 'A valid driving license verified through our automated government database check system.',
  },
  {
    id: 'vehicle',
    icon: 'car-outline',
    title: 'Registered vehicle',
    description: 'Vehicle must be registered with valid insurance and pass our multi-point safety inspection.',
  },
  {
    id: 'medical',
    icon: 'heart-outline',
    title: 'Medical fitness report',
    description: 'A recent medical fitness certificate from a certified practitioner confirming driving fitness.',
  },
  {
    id: 'window',
    icon: 'calendar-outline',
    title: 'Available within service window',
    description: 'Service operates between 7:45 AM to 8:00 PM — designed for maximum safety during daylight hours.',
  },
  {
    id: 'background',
    icon: 'shield-outline',
    title: 'Clean background check',
    description: 'Comprehensive criminal background verification through authorized law enforcement channels.',
  },
];

function ShieldSpinner() {
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 30000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [spin]);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <View style={styles.shieldWrap}>
      <Animated.View style={[styles.shieldSpin, { transform: [{ rotate }] }]}>
        <View style={[styles.ring, styles.ring1]} />
        <View style={[styles.ring, styles.ring2]} />
        <View style={[styles.ring, styles.ring3]} />
      </Animated.View>
      <View style={styles.shieldCenter}>
        <LinearGradient
          colors={[colors.magenta, '#F43F5E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.shieldIcon}
        >
          <Ionicons name="shield-checkmark-outline" size={30} color="#FFFFFF" />
        </LinearGradient>
      </View>
    </View>
  );
}

function RequirementCard({ item }: { item: Requirement }) {
  const [hovered, setHovered] = useState(false);
  const hoverHandlers = IS_WEB
    ? {
        // @ts-ignore -- web only pointer events
        onMouseEnter: () => setHovered(true),
        // @ts-ignore -- web only pointer events
        onMouseLeave: () => setHovered(false),
      }
    : {};

  return (
    <View style={[styles.reqCard, hovered && styles.reqCardHovered]} {...hoverHandlers}>
      {hovered ? (
        <LinearGradient
          colors={[colors.magenta, '#F43F5E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.reqIcon}
        >
          <Ionicons name={item.icon} size={20} color="#FFFFFF" />
        </LinearGradient>
      ) : (
        <View style={[styles.reqIcon, styles.reqIconIdle]}>
          <Ionicons name={item.icon} size={20} color={colors.magenta} />
        </View>
      )}

      <View style={styles.reqContent}>
        <View style={styles.reqTop}>
          <Text style={[styles.reqTitle, hovered && { color: '#BE185D' }]}>{item.title}</Text>
          <Ionicons
            name="chevron-forward"
            size={16}
            color={hovered ? '#F9A8D4' : '#D1D5DB'}
            style={hovered ? styles.chevronHovered : undefined}
          />
        </View>
        <Text style={styles.reqDescription}>{item.description}</Text>
      </View>
    </View>
  );
}

export default function LadyCaptainEligibility({ isDesktop }: { isDesktop: boolean }) {
  return (
    <View style={styles.section}>
      <View style={[styles.grid, !isDesktop && styles.gridStacked]}>
        <View style={[styles.left, !isDesktop && styles.leftStacked]}>
          <View style={styles.badge}>
            <Ionicons name="ribbon-outline" size={13} color="#BE185D" />
            <Text style={styles.badgeLabel}>Lady Captain Eligibility</Text>
          </View>
          <Text style={styles.heading}>
            What it takes to <Text style={styles.headingAccent}>drive with us</Text>
          </Text>
          <Text style={styles.lead}>
            We maintain the highest standards so every passenger feels safe. If you meet the
            criteria below, you're one step closer to financial freedom.
          </Text>

          {isDesktop ? <ShieldSpinner /> : null}
        </View>

        <View style={styles.right}>
          {REQUIREMENTS.map((item) => (
            <RequirementCard key={item.id} item={item} />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 24,
    paddingVertical: 56,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },

  grid: { flexDirection: 'row', gap: 64, alignItems: 'flex-start' },
  gridStacked: { flexDirection: 'column', gap: 32 },

  left: { flex: 5 },
  leftStacked: { width: '100%' },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
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
    marginTop: 18,
  },
  headingAccent: { color: colors.magenta },
  lead: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 26,
    color: colors.bodyMutedOnLight,
    marginTop: 16,
    maxWidth: 440,
  },

  shieldWrap: {
    marginTop: 40,
    width: 192,
    height: 192,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  shieldSpin: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  ring: { position: 'absolute', borderRadius: 999, borderWidth: 2, borderStyle: 'dashed' },
  ring1: { width: 192, height: 192, borderColor: 'rgba(224,22,108,0.2)' },
  ring2: { width: 160, height: 160, borderColor: 'rgba(224,22,108,0.3)' },
  ring3: { width: 128, height: 128, borderColor: 'rgba(224,22,108,0.15)' },
  shieldCenter: { alignItems: 'center', justifyContent: 'center' },
  shieldIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  right: { flex: 7, gap: 16 },

  reqCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#FFFFFF',
    // @ts-ignore -- web-only transition, no-op on native
    transitionProperty: 'transform, box-shadow',
    // @ts-ignore -- web-only transition, no-op on native
    transitionDuration: '250ms',
  },
  reqCardHovered: {
    transform: [{ translateX: 4 }],
  },

  reqIcon: {
    flexShrink: 0,
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reqIconIdle: {
    backgroundColor: '#FDF2F8',
    borderWidth: 1,
    borderColor: '#FCE7F3',
  },

  reqContent: { flex: 1 },
  reqTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  reqTitle: { fontFamily: fonts.displayMedium, fontSize: 15.5, color: colors.ink },
  chevronHovered: { transform: [{ translateX: 4 }] },
  reqDescription: {
    fontFamily: fonts.body,
    fontSize: 13.5,
    lineHeight: 20,
    color: colors.bodyMutedOnLight,
    marginTop: 4,
  },
});