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

const parcelImg = require('../../assets/illustrations/parcel.png');

const IS_WEB = Platform.OS === 'web';

const AMBER = colors.accentBlue; // brand blue, readable on white (foreground)
const AMBER_SOFT = '#5B8DEF'; // lighter blue, used for glow/gradient
const AMBER_DEEP = colors.navy; // near-ink navy for dark surfaces
const AMBER_ICE = colors.chipBg;
const AMBER_BORDER = 'rgba(51,80,222,0.18)';
const GLASS_BG = 'rgba(255,255,255,0.66)';
const GLASS_BORDER = 'rgba(255,255,255,0.9)';

// parcel.png has some transparent margin baked in around the rider. Nudge
// PARCEL_GROUND_PADDING up/down by eye until the wheels sit flush on the road.
const PARCEL_IMAGE_WIDTH = 248;
const PARCEL_IMAGE_HEIGHT = 205;
const PARCEL_GROUND_PADDING = 30;
const PARCEL_VISIBLE_HEIGHT = PARCEL_IMAGE_HEIGHT - PARCEL_GROUND_PADDING;

const TRUST_BADGES = [
  { icon: 'navigate-outline' as const, label: 'Live GPS tracking' },
  { icon: 'camera-outline' as const, label: 'Photo + OTP proof' },
  { icon: 'flash-outline' as const, label: 'Delivered in ~30 min' },
];

const PACKAGE_SIZES = ['Document', 'Small', 'Medium'] as const;

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
        <Ionicons name={icon} size={14} color={AMBER} />
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

function QuickSendCard() {
  const [pickup, setPickup] = useState('Connaught Place');
  const [drop, setDrop] = useState('Cyber Hub, Gurugram');
  const [size, setSize] = useState<(typeof PACKAGE_SIZES)[number]>('Small');

  return (
    <View style={styles.searchCard}>
      <View style={styles.searchRow}>
        <View style={styles.searchField}>
          <View style={[styles.dot, styles.dotOutline]} />
          <TextInput
            value={pickup}
            onChangeText={setPickup}
            placeholder="Pickup location"
            placeholderTextColor={colors.bodyMutedOnLight}
            style={styles.searchInput}
          />
        </View>
      </View>
      <View style={styles.searchRow}>
        <View style={styles.searchField}>
          <View style={[styles.dot, styles.dotFilled]} />
          <TextInput
            value={drop}
            onChangeText={setDrop}
            placeholder="Drop location"
            placeholderTextColor={colors.bodyMutedOnLight}
            style={styles.searchInput}
          />
        </View>
      </View>

      <View style={styles.sizeRow}>
        {PACKAGE_SIZES.map((s) => (
          <Pressable
            key={s}
            style={[styles.sizeChip, size === s && styles.sizeChipActive]}
            onPress={() => setSize(s)}
          >
            <Text style={[styles.sizeChipText, size === s && styles.sizeChipTextActive]}>{s}</Text>
          </Pressable>
        ))}
        <Pressable style={styles.findBtn}>
          <Ionicons name="cube" size={14} color="#FFFFFF" />
          <Text style={styles.findBtnText}>Get a quote</Text>
        </Pressable>
      </View>
    </View>
  );
}

/* ── Scenery builders (shared visual language with Carpool's road scene) ── */
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

function AnimatedParcelScene() {
  const bounceY = useRef(new Animated.Value(0)).current;
  const rock = useRef(new Animated.Value(0)).current;
  const roadScroll = useRef(new Animated.Value(0)).current;
  const treeScroll = useRef(new Animated.Value(0)).current;
  const hillScroll = useRef(new Animated.Value(0)).current;
  const grassScroll = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const bounce = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceY, {
          toValue: -1.6,
          duration: 220,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(bounceY, {
          toValue: 0.4,
          duration: 220,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    const chassisRock = Animated.loop(
      Animated.sequence([
        Animated.timing(rock, {
          toValue: 0.4,
          duration: 280,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(rock, {
          toValue: -0.4,
          duration: 280,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    const road = Animated.loop(
      Animated.timing(roadScroll, {
        toValue: -56,
        duration: 420,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      { iterations: -1 }
    );

    const trees = Animated.loop(
      Animated.timing(treeScroll, {
        toValue: -180,
        duration: 2300,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      { iterations: -1 }
    );

    const hills = Animated.loop(
      Animated.timing(hillScroll, {
        toValue: -260,
        duration: 6000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      { iterations: -1 }
    );

    const grass = Animated.loop(
      Animated.timing(grassScroll, {
        toValue: -120,
        duration: 1150,
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
    { h: 34, c: '#34d399' },
    { h: 46, c: '#22c55e' },
    { h: 28, c: '#4ade80' },
    { h: 40, c: '#16a34a' },
    { h: 32, c: '#34d399' },
  ];

  const hillSet = [
    { w: 140, h: 50, c: '#cbd5e1' },
    { w: 180, h: 70, c: '#e2e8f0' },
    { w: 120, h: 40, c: '#cbd5e1' },
  ];

  return (
    <View style={styles.sceneContent}>
      <View style={styles.skyLayer} />
      <Sun />

      <Animated.View style={[styles.hillsTrack, { transform: [{ translateX: hillScroll }] }]}>
        {hillSet.map((h, i) => (
          <Hill key={`h1-${i}`} w={h.w} h={h.h} color={h.c} />
        ))}
        {hillSet.map((h, i) => (
          <Hill key={`h2-${i}`} w={h.w} h={h.h} color={h.c} />
        ))}
      </Animated.View>

      <Animated.View style={[styles.treesTrack, { transform: [{ translateX: treeScroll }] }]}>
        {treeSet.map((t, i) => (
          <Tree key={`t1-${i}`} h={t.h} color={t.c} />
        ))}
        {treeSet.map((t, i) => (
          <Tree key={`t2-${i}`} h={t.h} color={t.c} />
        ))}
      </Animated.View>

      <View style={styles.roadWrap}>
        <View style={styles.roadSurface} />
        <View style={styles.roadEdge} />
        <View style={styles.roadMarkingsTrack}>
          <Animated.View style={[styles.roadMarkings, { transform: [{ translateX: roadScroll }] }]}>
            {roadDashes}
            {roadDashes}
          </Animated.View>
        </View>
      </View>

      <Animated.View
        style={[styles.parcelWrap, { transform: [{ translateY: bounceY }, { rotate }] }]}
      >
        <View style={styles.parcelClip}>
          <Image source={parcelImg} style={styles.sceneImage} resizeMode="contain" />
        </View>
        <View style={styles.parcelShadow} />
      </Animated.View>

      <Animated.View style={[styles.grassTrack, { transform: [{ translateX: grassScroll }] }]}>
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
export default function ParcelHero({ isDesktop }: { isDesktop: boolean }) {
  return (
    <View style={[styles.hero, !isDesktop && styles.heroStacked]}>
      <View pointerEvents="none" style={styles.glowLayer}>
        <View style={[styles.glowBlob, styles.glowBlobDeep]} />
        <View style={[styles.glowBlob, styles.glowBlobLight]} />
      </View>

      <View style={[styles.heroText, !isDesktop && styles.heroTextStacked]}>
        <View style={styles.badge}>
          <View style={styles.badgeDot} />
          <Text style={styles.badgeLabel}>SAME-CITY · SAME-DAY</Text>
        </View>

        <Text style={styles.heading}>
          Send it today.{'\n'}
          <Text style={styles.headingAccent}>Track it live, door to door.</Text>
        </Text>

        <Text style={styles.lead}>
          Drop a parcel with a nearby captain and watch it move in real time. Same-day pickup
          across Delhi NCR, with photo and OTP proof the moment it lands.
        </Text>

        <QuickSendCard />

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
          <AnimatedParcelScene />
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
    opacity: 0.16,
    // @ts-ignore -- web-only soft blur, no-op on native
    filter: IS_WEB ? 'blur(80px)' : undefined,
  },
  glowBlobDeep: { backgroundColor: AMBER_DEEP, top: -60, left: -100 },
  glowBlobLight: { backgroundColor: AMBER_SOFT, bottom: -80, right: -60 },

  heroText: { flex: 1 },
  heroTextStacked: { width: '100%' },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 8,
    backgroundColor: AMBER_ICE,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: AMBER_BORDER,
  },
  badgeDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: AMBER },
  badgeLabel: { fontFamily: fonts.bodyMedium, fontSize: 11.5, letterSpacing: 1, color: AMBER },

  heading: {
    fontFamily: fonts.display,
    fontSize: 40,
    lineHeight: 46,
    letterSpacing: -1,
    color: colors.ink,
    marginTop: 20,
    marginBottom: 16,
  },
  headingAccent: { color: AMBER },

  lead: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 26,
    color: colors.bodyMutedOnLight,
    maxWidth: 520,
    marginBottom: 24,
  },

  searchCard: {
    backgroundColor: GLASS_BG,
    borderWidth: 1,
    borderColor: GLASS_BORDER,
    borderRadius: 20,
    padding: 16,
    gap: 12,
    marginBottom: 24,
    maxWidth: 480,
    shadowColor: AMBER_DEEP,
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
  dot: { width: 8, height: 8, borderRadius: 4 },
  dotOutline: { borderWidth: 2, borderColor: AMBER, backgroundColor: 'transparent' },
  dotFilled: { backgroundColor: AMBER },

  sizeRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  sizeChip: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  sizeChipActive: { backgroundColor: AMBER },
  sizeChipText: { fontFamily: fonts.bodyMedium, fontSize: 12, color: colors.ink },
  sizeChipTextActive: { color: '#FFFFFF' },
  findBtn: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: AMBER,
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 18,
  },
  findBtnText: { fontFamily: fonts.bodyMedium, fontSize: 13.5, color: '#FFFFFF' },

  trustRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 20, marginBottom: 24 },
  trustBadge: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  trustBadgeIcon: {
    width: 28,
    height: 28,
    borderRadius: 9,
    backgroundColor: AMBER_ICE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trustBadgeLabel: { fontFamily: fonts.bodyMedium, fontSize: 12.5, color: colors.ink },

  storeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  storeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.ink,
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

  sceneCard: {
    backgroundColor: GLASS_BG,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: GLASS_BORDER,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: AMBER_DEEP,
    shadowOpacity: 0.1,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 16 },
    elevation: 5,
    overflow: 'hidden',
    // @ts-ignore -- web-only glass blur, no-op on native
    backdropFilter: IS_WEB ? 'blur(20px) saturate(160%)' : undefined,
  },

  sceneContent: { width: '100%', height: 300, position: 'relative', overflow: 'hidden' },

  skyLayer: { ...StyleSheet.absoluteFillObject, backgroundColor: colors.chipBg },

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
    backgroundColor: '#AEC2F5',
    // @ts-ignore -- web-only soft blur, no-op on native
    filter: IS_WEB ? 'blur(14px)' : undefined,
  },
  sunCore: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#5B8DEF',
    shadowColor: colors.accentBlue,
    shadowOpacity: 0.55,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },

  hillsTrack: { position: 'absolute', bottom: 46, left: 0, flexDirection: 'row', alignItems: 'flex-end' },
  hill: { borderRadius: 999, marginRight: 16 },

  treesTrack: { position: 'absolute', bottom: 44, left: 0, flexDirection: 'row', alignItems: 'flex-end' },
  tree: { alignItems: 'center', marginRight: 50, justifyContent: 'flex-end' },
  treeFoliage: { width: 22, borderRadius: 11 },
  treeTrunk: { width: 5, height: 10, backgroundColor: '#92400e', borderRadius: 2 },

  roadWrap: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 46, zIndex: 2 },
  roadSurface: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#475569',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  roadEdge: { position: 'absolute', top: 0, left: 0, right: 0, height: 2, backgroundColor: '#64748b' },
  roadMarkingsTrack: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 3,
    marginTop: -1.5,
    overflow: 'hidden',
  },
  roadMarkings: { flexDirection: 'row' },
  roadDash: {
    width: 28,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.65)',
    borderRadius: 1.5,
    marginRight: 28,
  },

  parcelWrap: { position: 'absolute', bottom: 44, alignSelf: 'center', zIndex: 3 },
  parcelClip: { width: PARCEL_IMAGE_WIDTH, height: PARCEL_VISIBLE_HEIGHT, overflow: 'hidden' },
  sceneImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: PARCEL_IMAGE_WIDTH,
    height: PARCEL_IMAGE_HEIGHT,
  },
  parcelShadow: {
    position: 'absolute',
    bottom: -2,
    left: '18%',
    right: '18%',
    height: 7,
    backgroundColor: 'rgba(15,23,42,0.2)',
    borderRadius: 4,
    // @ts-ignore
    filter: IS_WEB ? 'blur(5px)' : undefined,
  },

  grassTrack: { position: 'absolute', bottom: -2, left: 0, flexDirection: 'row', alignItems: 'flex-end', zIndex: 4 },
  grassTuft: { flexDirection: 'row', alignItems: 'flex-end', marginRight: 70 },
  grassBlade: { width: 3, backgroundColor: '#5B8DEF', borderRadius: 2 },
});
