import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors, fonts } from '../../constants/theme';
import { StoreBadgeIcon } from '../GetFatafatApp';

const carpoolImg = require('../../assets/illustrations/carpool.png');

const IS_WEB = Platform.OS === 'web';

const BLUE = colors.accentBlue; // '#3350DE'
const BLUE_DEEP = colors.navy; // '#161F42'
const BLUE_ICE = colors.chipBg; // '#EAF0FE'
const BLUE_BORDER = 'rgba(51,80,222,0.18)';
const GLASS_BG = 'rgba(255,255,255,0.66)';
const GLASS_BORDER = 'rgba(255,255,255,0.9)';

// carpool.png has empty transparent space below the wheels (baked into the
// cutout). We crop that strip off so the car's bottom edge — not the image's
// bottom edge — is what touches the road. Nudge CAR_GROUND_PADDING up/down
// by eye until the wheels sit flush; there's no way to measure this from code.
const CAR_IMAGE_WIDTH = 320;
const CAR_IMAGE_HEIGHT = 190;
const CAR_GROUND_PADDING = 34;
const CAR_VISIBLE_HEIGHT = CAR_IMAGE_HEIGHT - CAR_GROUND_PADDING;

// Bob + rock share one period so they move as a single, smooth up/down-and-tilt
// motion instead of two independently-timed oscillations beating against each
// other (was 260ms vs 320ms) — that mismatch is what read as a mechanical
// "zig-zag" rather than a car riding over a road.
const SUSPENSION_PERIOD_MS = 900;

const TRUST_BADGES = [
  { icon: 'shield-checkmark-outline' as const, label: 'ID-verified both sides' },
  { icon: 'time-outline' as const, label: 'Publish days ahead' },
  { icon: 'pricetag-outline' as const, label: 'No company mark-up' },
];

/* ── helpers ── */
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

function TrustBadge({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  return (
    <View style={styles.trustBadge}>
      <View style={styles.trustBadgeIcon}>
        <Ionicons name={icon} size={14} color={BLUE} />
      </View>
      <Text style={styles.trustBadgeLabel}>{label}</Text>
    </View>
  );
}

function StoreButton({ kind, small, big }: { kind: 'play' | 'apple'; small: string; big: string }) {
  const { hovered, handlers } = useHover();
  return (
    <Pressable style={[styles.storeBtn, hovered && styles.storeBtnHovered]} {...handlers}>
      <StoreBadgeIcon kind={kind} />
      <View>
        <Text style={styles.storeBtnSmall}>{small}</Text>
        <Text style={styles.storeBtnBig}>{big}</Text>
      </View>
    </Pressable>
  );
}

function RouteSearchCard() {
  const [from, setFrom] = useState('Delhi');
  const [to, setTo] = useState('Jaipur');

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <View style={styles.searchCard}>
      <View style={styles.searchRow}>
        <View style={styles.searchField}>
          <View style={[styles.dot, styles.dotOutline]} />
          <TextInput
            value={from}
            onChangeText={setFrom}
            placeholder="Leaving from..."
            placeholderTextColor={colors.bodyMutedOnLight}
            style={styles.searchInput}
          />
        </View>
        <Pressable style={styles.swapBtn} onPress={swap}>
          <Ionicons name="swap-vertical" size={16} color={BLUE} />
        </Pressable>
        <View style={styles.searchField}>
          <View style={[styles.dot, styles.dotFilled]} />
          <TextInput
            value={to}
            onChangeText={setTo}
            placeholder="Going to..."
            placeholderTextColor={colors.bodyMutedOnLight}
            style={styles.searchInput}
          />
        </View>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchField}>
          <Ionicons name="calendar-outline" size={14} color={colors.bodyMutedOnLight} />
          <Text style={styles.searchStaticText}>Today</Text>
        </View>
        <Pressable style={styles.findBtn}>
          <Ionicons name="search" size={14} color="#FFFFFF" />
          <Text style={styles.findBtnText}>Find rides</Text>
        </Pressable>
      </View>
    </View>
  );
}

/* ── Scenery builders ── */
function Hill({ w, h, color }: { w: number; h: number; color: string }) {
  return <View style={[styles.hill, { width: w, height: h, backgroundColor: color }]} />;
}

function Tree({ h, color }: { h: number; color: string }) {
  return (
    <View style={[styles.tree, { height: h }]}>
      <View style={[styles.treeFoliage, { height: h * 0.75, backgroundColor: color }]} />
      <View style={styles.treeTrunk} />
    </View>
  );
}

function GrassTuft() {
  return (
    <View style={styles.grassTuft}>
      <View style={[styles.grassBlade, { height: 10, marginLeft: 0 }]} />
      <View style={[styles.grassBlade, { height: 14, marginLeft: 3 }]} />
      <View style={[styles.grassBlade, { height: 8, marginLeft: 2 }]} />
    </View>
  );
}

/* ── Sun (soft glow, gentle idle pulse — stays put, doesn't scroll with parallax) ── */
function Sun() {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 2600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 2600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const glowScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.1] });
  const glowOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.4, 0.62] });

  return (
    <View style={styles.sunWrap} pointerEvents="none">
      <Animated.View
        style={[styles.sunGlow, { opacity: glowOpacity, transform: [{ scale: glowScale }] }]}
      />
      <View style={styles.sunCore} />
    </View>
  );
}

/* ── Animated driving scene ── */
function AnimatedCarScene() {
  const bounceY = useRef(new Animated.Value(0)).current;
  const rock = useRef(new Animated.Value(0)).current;
  const roadScroll = useRef(new Animated.Value(0)).current;
  const treeScroll = useRef(new Animated.Value(0)).current;
  const hillScroll = useRef(new Animated.Value(0)).current;
  const grassScroll = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Engine-idle bounce — small amplitude, synced to the road-dash cycle
    //    so the suspension motion reads as "rolling over the road" rather than floating.
    const bounce = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceY, {
          toValue: -1.6,
          duration: SUSPENSION_PERIOD_MS / 2,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(bounceY, {
          toValue: 0.4,
          duration: SUSPENSION_PERIOD_MS / 2,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    // 2. Chassis rock — now synced to the same period as the bounce above.
    const chassisRock = Animated.loop(
      Animated.sequence([
        Animated.timing(rock, {
          toValue: 0.35,
          duration: SUSPENSION_PERIOD_MS / 2,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(rock, {
          toValue: -0.35,
          duration: SUSPENSION_PERIOD_MS / 2,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    // 3. Road dashes – fastest (creates forward-motion illusion)
    //    NOTE: JS driver here (not native) — looped translateX on web can silently
    //    fail to apply under the native driver in some react-native-web versions.
    const road = Animated.loop(
      Animated.timing(roadScroll, {
        toValue: -56,
        duration: 520,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      { iterations: -1 }
    );

    // 4. Trees – medium speed
    const trees = Animated.loop(
      Animated.timing(treeScroll, {
        toValue: -180,
        duration: 2800,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      { iterations: -1 }
    );

    // 5. Hills – very slow (distant parallax)
    const hills = Animated.loop(
      Animated.timing(hillScroll, {
        toValue: -260,
        duration: 7000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      { iterations: -1 }
    );

    // 6. Foreground grass – very fast (near camera)
    const grass = Animated.loop(
      Animated.timing(grassScroll, {
        toValue: -120,
        duration: 1400,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      { iterations: -1 }
    );

    bounce.start();
    chassisRock.start();
    road.start();
    trees.start();
    hills.start();
    grass.start();

    return () => {
      bounce.stop();
      chassisRock.stop();
      road.stop();
      trees.stop();
      hills.stop();
      grass.stop();
    };
  }, [bounceY, rock, roadScroll, treeScroll, hillScroll, grassScroll]);

  const rotate = rock.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-0.6deg', '0.6deg'],
  });

  const roadDashes = Array.from({ length: 10 }).map((_, i) => (
    <View key={`rd-${i}`} style={styles.roadDash} />
  ));

  const treeSet = [
    { h: 34, c: '#5B8DEF', g: 50 },
    { h: 46, c: '#3350DE', g: 70 },
    { h: 28, c: '#1E9BE0', g: 40 },
    { h: 40, c: '#274690', g: 90 },
    { h: 32, c: '#5B8DEF', g: 60 },
  ];

  const hillSet = [
    { w: 140, h: 50, c: '#cbd5e1', g: 30 },
    { w: 180, h: 70, c: '#e2e8f0', g: 20 },
    { w: 120, h: 40, c: '#cbd5e1', g: 40 },
  ];

  return (
    <View style={styles.sceneContent}>
      {/* ── Sky ── */}
      <View style={styles.skyLayer} />

      {/* ── Sun (fixed, gentle glow pulse) ── */}
      <Sun />

      {/* ── Distant hills (slowest) ── */}
      <Animated.View
        style={[styles.hillsTrack, { transform: [{ translateX: hillScroll }] }]}
      >
        {hillSet.map((h, i) => (
          <Hill key={`h1-${i}`} w={h.w} h={h.h} color={h.c} />
        ))}
        {hillSet.map((h, i) => (
          <Hill key={`h2-${i}`} w={h.w} h={h.h} color={h.c} />
        ))}
      </Animated.View>

      {/* ── Trees on the other side of the road ── */}
      <Animated.View
        style={[styles.treesTrack, { transform: [{ translateX: treeScroll }] }]}
      >
        {treeSet.map((t, i) => (
          <Tree key={`t1-${i}`} h={t.h} color={t.c} />
        ))}
        {treeSet.map((t, i) => (
          <Tree key={`t2-${i}`} h={t.h} color={t.c} />
        ))}
      </Animated.View>

      {/* ── Road ── */}
      <View style={styles.roadWrap}>
        <View style={styles.roadSurface} />
        <View style={styles.roadEdge} />
        <View style={styles.roadMarkingsTrack}>
          <Animated.View
            style={[styles.roadMarkings, { transform: [{ translateX: roadScroll }] }]}
          >
            {roadDashes}
            {roadDashes}
          </Animated.View>
        </View>
      </View>

      {/* ── Car (wheels sit flush on the road surface) ── */}
      <Animated.View
        style={[
          styles.carWrap,
          { transform: [{ translateY: bounceY }, { rotate }] },
        ]}
      >
        <View style={styles.carClip}>
          <Image
            source={carpoolImg}
            style={styles.sceneImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.carShadow} />
      </Animated.View>

      {/* ── Foreground grass tufts (fastest, at bottom edge) ── */}
      <Animated.View
        style={[styles.grassTrack, { transform: [{ translateX: grassScroll }] }]}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <GrassTuft key={`g1-${i}`} />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <GrassTuft key={`g2-${i}`} />
        ))}
      </Animated.View>
    </View>
  );
}

/* ── main hero ── */
export default function CarpoolHero({ isDesktop }: { isDesktop: boolean }) {
  return (
    <View style={[styles.hero, !isDesktop && styles.heroStacked]}>
      {/* ambient glow behind the glass card */}
      <View pointerEvents="none" style={styles.glowLayer}>
        <View style={[styles.glowBlob, styles.glowBlobDeep]} />
        <View style={[styles.glowBlob, styles.glowBlobLight]} />
      </View>

      <View style={[styles.heroText, !isDesktop && styles.heroTextStacked]}>
        <View style={styles.badge}>
          <View style={styles.badgeDot} />
          <Text style={styles.badgeLabel}>INTERCITY · PEER-TO-PEER</Text>
        </View>

        <Text style={styles.heading}>
          Going between cities?{'\n'}
          <Text style={styles.headingAccent}>Share the ride, split the cost.</Text>
        </Text>

        <Text style={styles.lead}>
          Book a seat on a ride someone's already publishing — or publish your own trip and let
          verified co-travellers cover part of the cost. The price is set by the driver, always
          shown before you book.
        </Text>

        <RouteSearchCard />

        <View style={styles.trustRow}>
          {TRUST_BADGES.map((b) => (
            <TrustBadge key={b.label} icon={b.icon} label={b.label} />
          ))}
        </View>

        <View style={styles.storeRow}>
          <StoreButton kind="play" small="GET IT ON" big="Google Play" />
          <StoreButton kind="apple" small="Download on the" big="App Store" />
        </View>
      </View>

      <View style={[styles.heroSceneWrap, !isDesktop && styles.heroSceneWrapStacked]}>
        <View style={styles.sceneCard}>
          <AnimatedCarScene />
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

  /* Route search — glassmorphism card */
  searchCard: {
    backgroundColor: GLASS_BG,
    borderWidth: 1,
    borderColor: GLASS_BORDER,
    borderRadius: 20,
    padding: 16,
    gap: 12,
    marginBottom: 24,
    maxWidth: 480,
    shadowColor: BLUE_DEEP,
    shadowOpacity: 0.1,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 14 },
    elevation: 4,
    // @ts-ignore -- web-only glass blur, no-op on native
    backdropFilter: IS_WEB ? 'blur(20px) saturate(160%)' : undefined,
  },
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  searchField: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  searchInput: { flex: 1, fontFamily: fonts.body, fontSize: 13.5, color: colors.ink, padding: 0 },
  searchStaticText: { fontFamily: fonts.body, fontSize: 13.5, color: colors.ink },
  dot: { width: 8, height: 8, borderRadius: 4 },
  dotOutline: { borderWidth: 2, borderColor: BLUE, backgroundColor: 'transparent' },
  dotFilled: { backgroundColor: BLUE },
  swapBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  findBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: BLUE,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  findBtnText: { fontFamily: fonts.bodyMedium, fontSize: 13.5, color: '#FFFFFF' },

  trustRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 20, marginBottom: 24 },
  trustBadge: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  trustBadgeIcon: {
    width: 28,
    height: 28,
    borderRadius: 9,
    backgroundColor: BLUE_ICE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trustBadgeLabel: { fontFamily: fonts.bodyMedium, fontSize: 12.5, color: colors.ink },

  storeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  storeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: BLUE_DEEP,
    borderRadius: 14,
    paddingVertical: 11,
    paddingHorizontal: 18,
    // @ts-ignore -- web-only transition, no-op on native
    transitionProperty: 'transform, background-color',
    // @ts-ignore -- web-only transition, no-op on native
    transitionDuration: '180ms',
  },
  storeBtnHovered: { backgroundColor: '#0B1230', transform: [{ translateY: -2 }] },
  storeBtnSmall: { fontFamily: fonts.body, fontSize: 9.5, color: 'rgba(255,255,255,0.75)', letterSpacing: 0.4 },
  storeBtnBig: { fontFamily: fonts.displayMedium, fontSize: 14.5, color: '#FFFFFF', marginTop: 1 },

  heroSceneWrap: { flex: 1 },
  heroSceneWrapStacked: { width: '100%' },

  /* Glass card that holds the animated scene */
  sceneCard: {
    backgroundColor: GLASS_BG,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: GLASS_BORDER,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: BLUE_DEEP,
    shadowOpacity: 0.1,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 16 },
    elevation: 5,
    overflow: 'hidden',
    // @ts-ignore -- web-only glass blur, no-op on native
    backdropFilter: IS_WEB ? 'blur(20px) saturate(160%)' : undefined,
  },

  /* ═══════════════════════════════════════
     ANIMATED SCENE LAYERS
     ═══════════════════════════════════════ */
  sceneContent: {
    width: '100%',
    height: 300,
    position: 'relative',
    overflow: 'hidden',
  },

  /* ── Sky ── */
  skyLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#f1f5f9', // very pale slate blue
  },

  /* ── Sun ── */
  sunWrap: {
    position: 'absolute',
    top: 18,
    right: 26,
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sunGlow: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EAF0FE', // soft light-blue glow
    // @ts-ignore -- web-only soft blur, no-op on native
    filter: IS_WEB ? 'blur(14px)' : undefined,
  },
  sunCore: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#5B8DEF',
    shadowColor: '#3350DE',
    shadowOpacity: 0.55,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },

  /* ── Hills (distant, slowest) ── */
  hillsTrack: {
    position: 'absolute',
    bottom: 46,
    left: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  hill: {
    borderRadius: 999,
    marginRight: 16,
  },

  /* ── Trees (other side of road, medium speed) ── */
  treesTrack: {
    position: 'absolute',
    bottom: 44,
    left: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  tree: {
    alignItems: 'center',
    marginRight: 50,
    justifyContent: 'flex-end',
  },
  treeFoliage: {
    width: 22,
    borderRadius: 11,
  },
  treeTrunk: {
    width: 5,
    height: 10,
    backgroundColor: '#161F42', // navy trunk
    borderRadius: 2,
  },

  /* ── Road ── */
  roadWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 46,
    zIndex: 2,
  },
  roadSurface: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#475569', // slate-600 asphalt
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  roadEdge: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#64748b', // lighter edge line
  },
  roadMarkingsTrack: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 3,
    marginTop: -1.5,
    overflow: 'hidden',
  },
  roadMarkings: {
    flexDirection: 'row',
  },
  roadDash: {
    width: 28,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.65)',
    borderRadius: 1.5,
    marginRight: 28,
  },

  /* ── Car — anchored so the wheels sit right at the road's top edge (44) ── */
  carWrap: {
    position: 'absolute',
    bottom: 44,
    alignSelf: 'center',
    zIndex: 3,
  },
  carClip: {
    width: CAR_IMAGE_WIDTH,
    height: CAR_VISIBLE_HEIGHT,
    overflow: 'hidden',
  },
  sceneImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: CAR_IMAGE_WIDTH,
    height: CAR_IMAGE_HEIGHT,
  },
  carShadow: {
    position: 'absolute',
    bottom: -2,
    left: '14%',
    right: '14%',
    height: 7,
    backgroundColor: 'rgba(15,23,42,0.2)',
    borderRadius: 4,
    // @ts-ignore
    filter: IS_WEB ? 'blur(5px)' : undefined,
  },

  /* ── Foreground grass (fastest parallax) ── */
  grassTrack: {
    position: 'absolute',
    bottom: -2,
    left: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    zIndex: 4,
  },
  grassTuft: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginRight: 70,
  },
  grassBlade: {
    width: 3,
    backgroundColor: '#5B8DEF', // light blue
    borderRadius: 2,
  },
});