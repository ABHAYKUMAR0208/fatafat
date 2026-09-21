import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors, fonts } from '../../constants/theme';

const IS_WEB = Platform.OS === 'web';

// Same palette as the Carpool page — accent blue + navy, no pink.
const BLUE = colors.accentBlue; // '#3350DE'
const BLUE_DEEP = colors.navy; // '#161F42'
const BLUE_ICE = colors.chipBg; // '#EAF0FE'
const BLUE_BORDER = 'rgba(51,80,222,0.18)';
const GLASS_BG = 'rgba(255,255,255,0.66)';
const GLASS_BORDER = 'rgba(255,255,255,0.9)';

const FEATURES = [
  { icon: 'navigate-outline' as const, label: '1 city live, 5 more on the way' },
  { icon: 'pricetag-outline' as const, label: 'One flat fare model, every city' },
  { icon: 'shield-checkmark-outline' as const, label: 'Verified captains in every market' },
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

const PINS = [
  { id: 'delhi', city: 'Delhi NCR', status: 'LIVE', x: 160, y: 70, filled: true },
  { id: 'mumbai', city: 'Mumbai', status: 'SOON', x: 200, y: 220, filled: false },
  { id: 'pune', city: 'Pune', status: 'SOON', x: 240, y: 320, filled: false },
];

function RoutePin({ city, status, filled }: { city: string; status: string; filled: boolean }) {
  return (
    <View style={styles.pinRow}>
      <View style={[styles.pinDot, filled ? styles.pinDotFilled : styles.pinDotOutline]} />
      <View>
        <Text style={styles.pinCity}>{city}</Text>
        <Text style={[styles.pinStatus, filled && styles.pinStatusLive]}>{status}</Text>
      </View>
    </View>
  );
}

function CaptainsCard() {
  return (
    <MotiView
      from={{ opacity: 0, translateY: -12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 500 }}
      style={styles.captainsCard}
    >
      <View style={styles.captainsIconWrap}>
        <Ionicons name="people" size={16} color="#FFFFFF" />
      </View>
      <View>
        <Text style={styles.captainsValue}>
          1,000+ <Text style={styles.captainsValueLight}>Captains</Text>
        </Text>
        <Text style={styles.captainsSub}>earning every week</Text>
      </View>
    </MotiView>
  );
}

function CoverageCard() {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 500, delay: 120 }}
      style={styles.coverageCard}
    >
      <Text style={styles.coverageLabel}>Cities live this month</Text>
      <View style={styles.coverageValueRow}>
        <Text style={styles.coverageValue}>1</Text>
        <View style={styles.coverageTrend}>
          <Ionicons name="trending-up" size={13} color="#34D399" />
        </View>
      </View>
      <Text style={styles.coverageSub}>+3 launching soon</Text>
    </MotiView>
  );
}

function MapScene() {
  return (
    <View style={styles.mapPanel}>
      {/* Soft decorative terrain blobs standing in for a real map tile */}
      <View pointerEvents="none" style={[styles.terrainBlob, styles.terrainWater]} />
      <View pointerEvents="none" style={[styles.terrainBlob, styles.terrainGreen1]} />
      <View pointerEvents="none" style={[styles.terrainBlob, styles.terrainGreen2]} />

      <Svg style={StyleSheet.absoluteFill} viewBox="0 0 300 380" preserveAspectRatio="none">
        <Path
          d="M 92 54 C 100 110, 128 170, 150 232 C 158 258, 166 288, 172 312"
          stroke={BLUE}
          strokeWidth={4}
          strokeDasharray="2,10"
          strokeLinecap="round"
          fill="none"
        />
      </Svg>

      {PINS.map((p) => (
        <View key={p.id} style={[styles.pinWrap, { left: p.x, top: p.y }]}>
          <RoutePin city={p.city} status={p.status} filled={p.filled} />
        </View>
      ))}

      <MotiView
        from={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 1100, loop: true, repeatReverse: true }}
        style={styles.pillFloating}
      >
        <FontAwesome5 name="motorcycle" size={12} color={BLUE} />
        <Text style={styles.pillText}>On the way</Text>
      </MotiView>

      <View style={styles.captainsCardWrap}>
        <CaptainsCard />
      </View>
      <View style={styles.coverageCardWrap}>
        <CoverageCard />
      </View>
    </View>
  );
}

function PrimaryButton({ label }: { label: string }) {
  const { hovered, handlers } = useHover();
  return (
    <Pressable style={[styles.primaryBtn, hovered && styles.primaryBtnHovered]} {...handlers}>
      <Text style={styles.primaryBtnText}>{label}</Text>
      <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
    </Pressable>
  );
}

function SecondaryButton({ label }: { label: string }) {
  const { hovered, handlers } = useHover();
  return (
    <Pressable style={styles.secondaryBtn} {...handlers}>
      <Ionicons name="play-circle-outline" size={20} color={hovered ? BLUE_DEEP : BLUE} />
      <Text style={[styles.secondaryBtnText, hovered && styles.secondaryBtnTextHovered]}>{label}</Text>
    </Pressable>
  );
}

export default function CitiesHero({ isDesktop = true }: { isDesktop?: boolean }) {
  return (
    <View style={[styles.hero, !isDesktop && styles.heroStacked]}>
      <View pointerEvents="none" style={styles.glowLayer}>
        <View style={[styles.glowBlob, styles.glowBlobDeep]} />
        <View style={[styles.glowBlob, styles.glowBlobLight]} />
      </View>

      <View style={[styles.heroText, !isDesktop && styles.heroTextStacked]}>
        <View style={styles.badge}>
          <View style={styles.badgeDot} />
          <Text style={styles.badgeLabel}>WHERE WE OPERATE</Text>
        </View>

        <Text style={styles.heading}>
          Everywhere you go,{'\n'}
          <Text style={styles.headingAccent}>we're getting there too.</Text>
        </Text>

        <Text style={styles.lead}>
          Live in Delhi NCR today, with Mumbai, Bengaluru and Pune next in line. Same flat fares,
          the same verified captains and the same reliable app — in every city we launch.
        </Text>

        <View style={styles.featuresCol}>
          {FEATURES.map((f) => (
            <View key={f.label} style={styles.feature}>
              <View style={styles.featureIcon}>
                <Ionicons name={f.icon} size={16} color={BLUE} />
              </View>
              <Text style={styles.featureLabel}>{f.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.ctaRow}>
          <PrimaryButton label="Explore all cities" />
          <SecondaryButton label="See how it works" />
        </View>
      </View>

      <View style={[styles.heroSceneWrap, !isDesktop && styles.heroSceneWrapStacked]}>
        <View style={styles.sceneCard}>
          <MapScene />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 48,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
    position: 'relative',
  },
  heroStacked: { flexDirection: 'column-reverse', gap: 32 },

  glowLayer: { ...StyleSheet.absoluteFillObject, overflow: 'hidden' },
  glowBlob: {
    position: 'absolute',
    width: 360,
    height: 360,
    borderRadius: 180,
    opacity: 0.14,
    // @ts-ignore -- web-only soft blur, no-op on native
    filter: IS_WEB ? 'blur(80px)' : undefined,
  },
  glowBlobDeep: { backgroundColor: BLUE_DEEP, top: -60, left: -100 },
  glowBlobLight: { backgroundColor: BLUE, bottom: -80, right: -60 },

  heroText: { flex: 1 },
  heroTextStacked: { width: '100%' },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 8,
    backgroundColor: BLUE_ICE,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: BLUE_BORDER,
  },
  badgeDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: BLUE },
  badgeLabel: { fontFamily: fonts.bodyMedium, fontSize: 11.5, letterSpacing: 1, color: BLUE },

  heading: {
    fontFamily: fonts.display,
    fontSize: 40,
    lineHeight: 46,
    letterSpacing: -1,
    color: colors.ink,
    marginTop: 20,
    marginBottom: 16,
  },
  headingAccent: { color: BLUE },

  lead: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 26,
    color: colors.bodyMutedOnLight,
    maxWidth: 520,
    marginBottom: 24,
  },

  featuresCol: { gap: 14, marginBottom: 28 },
  feature: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  featureIcon: {
    width: 32,
    height: 32,
    borderRadius: 11,
    backgroundColor: BLUE_ICE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureLabel: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.ink },

  ctaRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 24 },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: BLUE_DEEP,
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 26,
    // @ts-ignore -- web-only transition, no-op on native
    transitionProperty: 'transform, background-color',
    // @ts-ignore -- web-only transition, no-op on native
    transitionDuration: '180ms',
  },
  primaryBtnHovered: { backgroundColor: BLUE, transform: [{ translateY: -2 }] },
  primaryBtnText: { fontFamily: fonts.bodyMedium, fontSize: 14.5, color: '#FFFFFF' },

  secondaryBtn: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  secondaryBtnText: { fontFamily: fonts.bodyMedium, fontSize: 14.5, color: BLUE },
  secondaryBtnTextHovered: { color: BLUE_DEEP },

  heroSceneWrap: { flex: 1 },
  heroSceneWrapStacked: { width: '100%' },

  sceneCard: {
    backgroundColor: GLASS_BG,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: GLASS_BORDER,
    height: 420,
    width: '100%',
    shadowColor: BLUE_DEEP,
    shadowOpacity: 0.1,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 16 },
    elevation: 5,
    overflow: 'hidden',
    // @ts-ignore -- web-only glass blur, no-op on native
    backdropFilter: IS_WEB ? 'blur(20px) saturate(160%)' : undefined,
  },

  /* Map scene — a stand-in "map" backdrop with a route, pins and two floating stat cards */
  mapPanel: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#F7F5EF',
  },
  terrainBlob: { position: 'absolute', borderRadius: 999, opacity: 0.5 },
  terrainWater: {
    width: 260,
    height: 260,
    backgroundColor: '#CFE3F5',
    left: -110,
    bottom: -80,
  },
  terrainGreen1: {
    width: 140,
    height: 90,
    backgroundColor: '#E1EAD8',
    right: -30,
    top: 40,
    opacity: 0.6,
  },
  terrainGreen2: {
    width: 110,
    height: 70,
    backgroundColor: '#E1EAD8',
    right: 60,
    bottom: 120,
    opacity: 0.5,
  },

  pinWrap: { position: 'absolute' },
  pinRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  pinDot: { width: 14, height: 14, borderRadius: 7, borderWidth: 2.5, borderColor: BLUE },
  pinDotFilled: { backgroundColor: BLUE },
  pinDotOutline: { backgroundColor: '#FFFFFF' },
  pinCity: { fontFamily: fonts.displayMedium, fontSize: 14, color: colors.ink },
  pinStatus: {
    fontFamily: fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 0.5,
    color: colors.bodyMutedOnLight,
  },
  pinStatusLive: { color: BLUE },

  pillFloating: {
    position: 'absolute',
    top: 128,
    left: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 14,
    shadowColor: BLUE_DEEP,
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  pillText: { fontFamily: fonts.bodyMedium, fontSize: 12, color: colors.ink },

  captainsCardWrap: { position: 'absolute', top: 18, right: 18 },
  captainsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: BLUE_DEEP,
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
    maxWidth: 220,
  },
  captainsIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captainsValue: { fontFamily: fonts.displayMedium, fontSize: 15, color: colors.ink },
  captainsValueLight: { fontFamily: fonts.body, color: colors.ink },
  captainsSub: { fontFamily: fonts.body, fontSize: 11.5, color: colors.bodyMutedOnLight },

  /* Floating coverage stat card — bottom-right, mirrors the reference layout */
  coverageCardWrap: { position: 'absolute', bottom: 18, right: 18 },
  coverageCard: {
    backgroundColor: BLUE_DEEP,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 18,
    shadowColor: BLUE_DEEP,
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  coverageLabel: { fontFamily: fonts.body, fontSize: 11.5, color: 'rgba(255,255,255,0.6)', marginBottom: 6 },
  coverageValueRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  coverageValue: { fontFamily: fonts.display, fontSize: 30, color: '#FFFFFF' },
  coverageTrend: {
    width: 22,
    height: 22,
    borderRadius: 8,
    backgroundColor: 'rgba(52,211,153,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverageSub: { fontFamily: fonts.bodyMedium, fontSize: 11.5, color: '#34D399', marginTop: 4 },
});