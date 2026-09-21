import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import type { DimensionValue } from 'react-native';
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';
import { colors, fonts } from '../../constants/theme';
import StoreButtons from '../Shared/StoreButtons';

type CityStatus = 'live' | 'soon';

type CityLocation = {
  id: string;
  city: string;
  status: CityStatus;
  emoji: string;
  detail: string;
};

const LOCATIONS: CityLocation[] = [
  {
    id: 'delhi-ncr',
    city: 'Delhi NCR',
    status: 'live',
    emoji: '📍',
    detail: 'Full operations across Delhi, Gurgaon, Noida & Faridabad',
  },
  {
    id: 'mumbai',
    city: 'Mumbai',
    status: 'soon',
    emoji: '🏙️',
    detail: 'Launching soon in Mumbai metropolitan region',
  },
  {
    id: 'bengaluru',
    city: 'Bengaluru',
    status: 'soon',
    emoji: '🌴',
    detail: "Coming to India's Silicon Valley next",
  },
  {
    id: 'pune',
    city: 'Pune',
    status: 'soon',
    emoji: '⛰️',
    detail: 'Ride-hailing services arriving in Pune',
  },
];

type Stat = { id: string; target: number; label: string };

const STATS: Stat[] = [
  { id: 'riders', target: 50000, label: 'Active Riders' },
  { id: 'drivers', target: 2500, label: 'Driver Partners' },
  { id: 'cities', target: 4, label: 'Cities & Growing' },
];

const IS_WEB = Platform.OS === 'web';

/** Counts up from 0 to `target` with an ease-out curve, formatted like "50,000+". */
function useCountUp(target: number, durationMs = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf: number;
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  return value;
}

function formatStat(n: number) {
  if (n >= 1000) return `${n.toLocaleString('en-IN')}+`;
  return `${n}`;
}

function LocationCard({ location, index }: { location: CityLocation; index: number }) {
  const [hovered, setHovered] = useState(false);
  const isLive = location.status === 'live';

  const hoverHandlers = IS_WEB
    ? {
        // @ts-ignore - web only pointer events
        onMouseEnter: () => setHovered(true),
        // @ts-ignore - web only pointer events
        onMouseLeave: () => setHovered(false),
      }
    : {};

  return (
    <MotiView
      style={[styles.card, isLive && styles.cardActive, hovered && styles.cardHovered]}
      from={{ opacity: 0, translateY: 24 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 500, delay: index * 100 }}
      {...hoverHandlers}
    >
      <View style={styles.cardIconWrap}>
        <Text style={styles.cardIcon}>{location.emoji}</Text>
      </View>

      <View style={styles.cardTop}>
        <Text style={styles.cityName}>{location.city}</Text>
        {isLive ? (
          <View style={[styles.statusBadge, styles.statusLive]}>
            <View style={styles.liveDot} />
            <Text style={styles.statusLiveText}>Live</Text>
          </View>
        ) : (
          <View style={[styles.statusBadge, styles.statusSoon]}>
            <Text style={styles.statusSoonText}>Coming Soon</Text>
          </View>
        )}
      </View>

      <Text style={styles.cardDetail}>{location.detail}</Text>
    </MotiView>
  );
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const count = useCountUp(stat.target);

  return (
    <MotiView
      style={styles.statCard}
      from={{ opacity: 0, translateY: 16 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 500, delay: 200 + index * 120 }}
    >
      <Text style={styles.statNumber}>{formatStat(count)}</Text>
      <Text style={styles.statLabel}>{stat.label}</Text>
    </MotiView>
  );
}

/** A soft radial-looking glow built from nested translucent circles (LinearGradient has no radial mode). */
function Glow({ size, color }: { size: number; color: string }) {
  return (
    <View style={[styles.glowOuter, { width: size, height: size, borderRadius: size / 2 }]}>
      <View
        style={[
          styles.glowRing,
          {
            width: size * 0.72,
            height: size * 0.72,
            borderRadius: (size * 0.72) / 2,
            backgroundColor: color,
            opacity: 0.35,
          },
        ]}
      />
      <View
        style={[
          styles.glowRing,
          {
            width: size * 0.42,
            height: size * 0.42,
            borderRadius: (size * 0.42) / 2,
            backgroundColor: color,
            opacity: 0.55,
          },
        ]}
      />
    </View>
  );
}

/** Two soft, slow-drifting glow blobs behind the CTA card content — keeps the dark panel feeling alive. */
function AnimatedOrbs() {
  return (
    <>
      <MotiView
        style={[styles.orb, styles.orbOne]}
        from={{ translateX: 0, translateY: 0, scale: 1 }}
        animate={{ translateX: -36, translateY: 24, scale: 1.18 }}
        transition={{
          type: 'timing',
          duration: 7000,
          easing: Easing.inOut(Easing.ease),
          loop: true,
        }}
      >
        <Glow size={420} color="#3350DE" />
      </MotiView>

      <MotiView
        style={[styles.orb, styles.orbTwo]}
        from={{ translateX: 0, translateY: 0, scale: 1 }}
        animate={{ translateX: 30, translateY: -22, scale: 1.12 }}
        transition={{
          type: 'timing',
          duration: 9000,
          easing: Easing.inOut(Easing.ease),
          loop: true,
        }}
      >
        <Glow size={320} color="#38BDF8" />
      </MotiView>
    </>
  );
}

type Particle = {
  id: string;
  size: number;
  color: string;
  top: DimensionValue;
  side: 'left' | 'right';
  offset: DimensionValue;
  duration: number;
};

const PARTICLES: Particle[] = [
  { id: 'p1', size: 8, color: 'rgba(51,80,222,0.55)', top: '8%', side: 'right', offset: '-4%', duration: 4200 },
  { id: 'p2', size: 6, color: 'rgba(56,189,248,0.55)', top: '38%', side: 'left', offset: '-5%', duration: 5200 },
  { id: 'p3', size: 7, color: 'rgba(91,141,239,0.5)', top: '68%', side: 'right', offset: '-6%', duration: 6000 },
  { id: 'p4', size: 5, color: 'rgba(143,198,255,0.6)', top: '55%', side: 'left', offset: '-4%', duration: 5600 },
];

/** Tiny drifting dots around the phone, echoing the original mockup's floating particles. */
function PhoneParticles() {
  return (
    <>
      {PARTICLES.map((p, i) => {
        const sideStyle = p.side === 'left' ? { left: p.offset } : { right: p.offset };

        return (
          <MotiView
            key={p.id}
            style={[
              styles.particle,
              sideStyle,
              {
                width: p.size,
                height: p.size,
                borderRadius: p.size / 2,
                backgroundColor: p.color,
                top: p.top,
              },
            ]}
            from={{ translateY: 0, opacity: 0.5 }}
            animate={{ translateY: i % 2 === 0 ? -14 : 14, opacity: 1 }}
            transition={{
              type: 'timing',
              duration: p.duration,
              easing: Easing.inOut(Easing.ease),
              loop: true,
            }}
          />
        );
      })}
    </>
  );
}

/** Gentle up/down float + tilt for the phone mockup — the "jackpot" bit of motion the CTA needed. */
function PhoneFloat({ children }: { children: React.ReactNode }) {
  return (
    <MotiView
      style={styles.phoneFloatWrap}
      from={{ translateY: 0, rotateZ: '2deg' }}
      animate={{ translateY: -14, rotateZ: '-1.5deg' }}
      transition={{
        type: 'timing',
        duration: 3000,
        easing: Easing.inOut(Easing.ease),
        loop: true,
      }}
    >
      {children}
      <PhoneParticles />
    </MotiView>
  );
}

/** Small bounce for the map pin, like it's dropping onto the destination. */
function PinBounce() {
  return (
    <MotiView
      from={{ translateY: 0 }}
      animate={{ translateY: -6 }}
      transition={{
        type: 'timing',
        duration: 900,
        easing: Easing.inOut(Easing.ease),
        loop: true,
      }}
    >
      <Ionicons name="location" size={28} color={colors.accentBlue} />
    </MotiView>
  );
}

/** Simple route map: a dashed line connecting the four cities, Delhi NCR highlighted. */
function RouteMap() {
  const width = 1200;
  const height = 160;
  const points = [
    { x: 150, y: 90, label: 'Delhi NCR', live: true },
    { x: 450, y: 90, label: 'Mumbai', live: false },
    { x: 750, y: 80, label: 'Bengaluru', live: false },
    { x: 1050, y: 90, label: 'Pune', live: false },
  ];

  return (
    <View style={styles.mapWrap}>
      <Svg viewBox={`0 0 ${width} ${height}`} width="100%" height={140}>
        {points.slice(0, -1).map((p, i) => {
          const next = points[i + 1];
          return (
            <Line
              key={`line-${p.label}`}
              x1={p.x}
              y1={p.y}
              x2={next.x}
              y2={next.y}
              stroke="rgba(51,80,222,0.25)"
              strokeWidth={2}
              strokeDasharray="8 5"
            />
          );
        })}

        {points.map((p) => (
          <React.Fragment key={p.label}>
            <Circle
              cx={p.x}
              cy={p.y}
              r={12}
              fill={p.live ? 'rgba(51,80,222,0.15)' : 'rgba(148,163,184,0.15)'}
            />
            <Circle cx={p.x} cy={p.y} r={5} fill={p.live ? '#3350DE' : '#94A3B8'} />
            <SvgText
              x={p.x}
              y={p.y + 32}
              fontSize={13}
              fontWeight="600"
              fill={p.live ? '#3350DE' : '#94A3B8'}
              textAnchor="middle"
            >
              {p.label}
            </SvgText>
          </React.Fragment>
        ))}
      </Svg>
    </View>
  );
}

export default function WhereWeOperate() {
  return (
    <View style={styles.section}>
      <View style={styles.badge}>
        <View style={styles.badgeDiamond} />
        <Text style={styles.badgeLabel}>WHERE WE OPERATE</Text>
      </View>

      <Text style={styles.heading}>
        Expanding <Text style={styles.headingAccent}>across India</Text>
      </Text>

      <Text style={styles.subheading}>
        We're bringing affordable, reliable rides to every major city in
        India. Starting with Delhi NCR and growing fast.
      </Text>

      <View style={styles.grid}>
        {LOCATIONS.map((location, index) => (
          <LocationCard key={location.id} location={location} index={index} />
        ))}
      </View>

      <RouteMap />

      <View style={styles.statsRow}>
        {STATS.map((stat, index) => (
          <StatCard key={stat.id} stat={stat} index={index} />
        ))}
      </View>

      {/* Get the Fatafat App CTA */}
      <View style={styles.ctaCard}>
        <AnimatedOrbs />

        <View style={styles.ctaContent}>
          <View style={styles.ctaLabel}>
            <Ionicons name="sparkles" size={14} color="rgba(255,255,255,0.75)" />
            <Text style={styles.ctaLabelText}>Now Available</Text>
          </View>

          <Text style={styles.ctaHeading}>
            Get the <Text style={styles.ctaHeadingAccent}>Fatafat App</Text>
          </Text>

          <Text style={styles.ctaDescription}>
            Available now for Android and iOS across Delhi NCR. Book
            affordable rides in seconds, track your driver in real-time, and
            ride safely.
          </Text>

          <View style={styles.ctaButtonsWrap}>
            <StoreButtons />
          </View>
        </View>

        <PhoneFloat>
          <View style={styles.phoneMockup}>
            <View style={styles.phoneNotch} />
            <View style={styles.phoneScreen}>
              <View style={styles.screenHeader}>
                <View>
                  <Text style={styles.screenGreeting}>Good morning 👋</Text>
                  <Text style={styles.screenUser}>Alex Johnson</Text>
                </View>
                <View style={styles.screenAvatar}>
                  <Text style={styles.screenAvatarText}>A</Text>
                </View>
              </View>

              <View style={styles.screenSearch}>
                <Ionicons name="search" size={14} color="rgba(255,255,255,0.4)" />
                <Text style={styles.screenSearchText}>Where are you going?</Text>
              </View>

              <View style={styles.screenMapArea}>
                <PinBounce />
              </View>

              <View style={styles.screenBottomNav}>
                <View style={styles.navItem}>
                  <Ionicons name="home-outline" size={18} color="rgba(255,255,255,0.4)" />
                  <Text style={styles.navLabel}>Home</Text>
                </View>
                <View style={styles.navItem}>
                  <Ionicons name="car-sport" size={18} color={colors.accentBlue} />
                  <Text style={[styles.navLabel, styles.navLabelActive]}>Ride</Text>
                </View>
                <View style={styles.navItem}>
                  <Ionicons name="reader-outline" size={18} color="rgba(255,255,255,0.4)" />
                  <Text style={styles.navLabel}>Activity</Text>
                </View>
                <View style={styles.navItem}>
                  <Ionicons name="person-outline" size={18} color="rgba(255,255,255,0.4)" />
                  <Text style={styles.navLabel}>Profile</Text>
                </View>
              </View>
            </View>
          </View>
        </PhoneFloat>
      </View>
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
  badgeDiamond: {
    width: 8,
    height: 8,
    backgroundColor: colors.accentBlue,
    transform: [{ rotate: '45deg' }],
    borderRadius: 2,
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
  headingAccent: {
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

  // Location cards grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
    width: '100%',
    maxWidth: 1200,
    marginBottom: 32,
  },
  card: {
    flexGrow: 1,
    flexBasis: 250,
    maxWidth: 280,
    borderRadius: 20,
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(15,23,42,0.06)',
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
    // @ts-ignore - web only
    transitionProperty: 'transform, box-shadow, border-color',
    // @ts-ignore - web only
    transitionDuration: '250ms',
    // @ts-ignore - web only
    transitionTimingFunction: 'ease',
  },
  cardHovered: {
    transform: [{ translateY: -4 }],
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 14 },
  },
  cardActive: {
    borderColor: '#3350DE',
    backgroundColor: 'rgba(51,80,222,0.03)',
  },
  cardIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.chipBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardIcon: {
    fontSize: 20,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    flexWrap: 'wrap',
    gap: 8,
  },
  cityName: {
    fontFamily: fonts.displayMedium,
    fontSize: 18,
    color: colors.ink,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusLive: {
    backgroundColor: 'rgba(51,80,222,0.12)',
  },
  statusLiveText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    color: '#3350DE',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statusSoon: {
    backgroundColor: 'rgba(100,116,139,0.1)',
  },
  statusSoonText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3350DE',
  },
  cardDetail: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 20,
    color: colors.bodyMutedOnLight,
  },

  // Route map
  mapWrap: {
    width: '100%',
    maxWidth: 1200,
    borderRadius: 24,
    backgroundColor: 'rgba(51,80,222,0.03)',
    borderWidth: 1.5,
    borderColor: 'rgba(15,23,42,0.06)',
    paddingVertical: 12,
    marginBottom: 32,
    overflow: 'hidden',
  },

  // Stats row
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
    width: '100%',
    maxWidth: 1200,
    marginBottom: 48,
  },
  statCard: {
    flexGrow: 1,
    flexBasis: 200,
    alignItems: 'center',
    paddingVertical: 28,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(15,23,42,0.06)',
  },
  statNumber: {
    fontFamily: fonts.display,
    fontSize: 32,
    color: colors.accentBlue,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.bodyMutedOnLight,
  },

  // CTA card
  ctaCard: {
    position: 'relative',
    width: '100%',
    maxWidth: 1200,
    borderRadius: 32,
    backgroundColor: colors.navy,
    paddingVertical: 56,
    paddingHorizontal: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 40,
    overflow: 'hidden',
  },
  orb: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowOuter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowRing: {
    position: 'absolute',
  },
  orbOne: {
    top: '-28%',
    right: '-10%',
  },
  orbTwo: {
    bottom: '-24%',
    left: '4%',
  },
  ctaContent: {
    flexGrow: 1,
    flexBasis: 320,
    maxWidth: 480,
    zIndex: 1,
  },
  ctaLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 16,
  },
  ctaLabelText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    color: 'rgba(255,255,255,0.75)',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  ctaHeading: {
    fontFamily: fonts.display,
    fontSize: 34,
    lineHeight: 40,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  ctaHeadingAccent: {
    color: '#8FC6FF',
  },
  ctaDescription: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 23,
    color: 'rgba(148,163,184,0.9)',
  },
  ctaButtonsWrap: {
    marginTop: 30,
  },

  // Phone mockup
  phoneFloatWrap: {
    position: 'relative',
    zIndex: 1,
  },
  particle: {
    position: 'absolute',
  },
  phoneMockup: {
    width: 220,
    height: 440,
    borderRadius: 36,
    backgroundColor: '#0F172A',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 20 },
    elevation: 8,
  },
  phoneNotch: {
    alignSelf: 'center',
    width: 100,
    height: 22,
    backgroundColor: '#0F172A',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    zIndex: 2,
  },
  phoneScreen: {
    flex: 1,
    margin: 10,
    marginTop: 0,
    borderRadius: 24,
    backgroundColor: '#161F42',
    overflow: 'hidden',
    position: 'relative',
  },
  screenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingTop: 24,
    paddingBottom: 12,
  },
  screenGreeting: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
  },
  screenUser: {
    fontFamily: fonts.displayMedium,
    fontSize: 15,
    color: '#FFFFFF',
  },
  screenAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.accentBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenAvatarText: {
    fontFamily: fonts.displayMedium,
    fontSize: 13,
    color: '#FFFFFF',
  },
  screenSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
  },
  screenSearchText: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: 'rgba(255,255,255,0.3)',
  },
  screenMapArea: {
    flex: 1,
    marginHorizontal: 14,
    marginTop: 14,
    marginBottom: 14,
    borderRadius: 14,
    backgroundColor: 'rgba(51,80,222,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenBottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingBottom: 18,
    backgroundColor: 'rgba(15,23,42,0.92)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navLabel: {
    fontFamily: fonts.body,
    fontSize: 9,
    color: 'rgba(255,255,255,0.4)',
  },
  navLabelActive: {
    color: colors.accentBlue,
  },
});