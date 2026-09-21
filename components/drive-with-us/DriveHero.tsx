import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';
import { StoreBadgeIcon } from '../GetFatafatApp';

const IS_WEB = Platform.OS === 'web';

// The reference design runs on an indigo/blue accent (badge, heading
// highlight, feature icons) with a soft grey blob behind the copy — the
// shield/trust badge is the one place amber survives, same as the mock.
const BLUE = colors.accentBlue; // '#3350DE'
const BLUE_ICE = colors.chipBg; // '#EAF0FE'
const BLUE_BORDER = 'rgba(51,80,222,0.18)';
const GREY_BLOB = '#E7E9F1';

// Right-panel hero graphic — phone mockup + trust card + car scene, all baked
// into one image as supplied by design.
const heroImg = require('../../assets/illustrations/drive_with_us.png');
// Native pixel size of drive_with_us.png — keeps the Image's aspect ratio
// correct at any render width. Update these two numbers if the asset changes.
const HERO_IMG_WIDTH = 1519;
const HERO_IMG_HEIGHT = 1036;

const FEATURES = [
  { icon: 'calendar-outline' as const, label: 'Weekly payouts every Tuesday' },
  { icon: 'pricetag-outline' as const, label: 'Flat 12% commission' },
  { icon: 'heart-outline' as const, label: 'Family insurance from day one' },
];

function StoreButton({ kind, small, big }: { kind: 'play' | 'apple'; small: string; big: string }) {
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
    <Pressable style={[styles.storeBtn, hovered && styles.storeBtnHovered]} {...hoverHandlers}>
      <StoreBadgeIcon kind={kind} />
      <View>
        <Text style={styles.storeBtnSmall}>{small}</Text>
        <Text style={styles.storeBtnBig}>{big}</Text>
      </View>
    </Pressable>
  );
}

export default function DriveHero({ isDesktop }: { isDesktop: boolean }) {
  return (
    <View style={[styles.hero, !isDesktop && styles.heroStacked]}>
      <View pointerEvents="none" style={styles.blobLayer}>
        <View style={styles.blob} />
      </View>

      <View style={[styles.heroText, !isDesktop && styles.heroTextStacked]}>
        <View style={styles.badge}>
          <View style={styles.badgeDot} />
          <Text style={styles.badgeLabel}>FOR CAPTAINS</Text>
        </View>

        <Text style={styles.heading}>
          Drive with Fatafat,{'\n'}
          <Text style={styles.headingAccent}>earn every week.</Text>
        </Text>

        <Text style={styles.lead}>
          Transparent commission, weekly payouts, and family insurance — for auto, bike, scooty,
          car and parcel captains alike. No surge games, no hidden cuts.
        </Text>

        <View style={styles.featuresRow}>
          {FEATURES.map((f) => (
            <View key={f.label} style={styles.feature}>
              <View style={styles.featureIcon}>
                <Ionicons name={f.icon} size={16} color={BLUE} />
              </View>
              <Text style={styles.featureLabel}>{f.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.storeRow}>
          <StoreButton kind="play" small="GET IT ON" big="Google Play" />
          <StoreButton kind="apple" small="Download on the" big="App Store" />
        </View>
      </View>

      <View style={[styles.heroVisualWrap, !isDesktop && styles.heroVisualWrapStacked]}>
        <MotiView
          from={{ opacity: 0, translateY: 16 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500 }}
          style={styles.visualInner}
        >
          <Image
            source={heroImg}
            style={isDesktop ? styles.heroImageDesktop : styles.heroImageStacked}
            resizeMode="contain"
          />
        </MotiView>
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
    paddingVertical: 16,
    position: 'relative',
  },
  heroStacked: { flexDirection: 'column-reverse', gap: 40 },

  /* Soft grey circle sitting behind the copy, top-right — matches the
     reference's plain, low-contrast blob rather than a tinted glow. */
  blobLayer: { ...StyleSheet.absoluteFillObject, overflow: 'hidden' },
  blob: {
    position: 'absolute',
    top: -140,
    left: -60,
    width: 420,
    height: 420,
    borderRadius: 210,
    backgroundColor: GREY_BLOB,
  },

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

  featuresRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 20, marginBottom: 28 },
  feature: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  featureIcon: {
    width: 32,
    height: 32,
    borderRadius: 11,
    backgroundColor: BLUE_ICE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureLabel: { fontFamily: fonts.bodyMedium, fontSize: 12.5, color: colors.ink },

  storeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  storeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.navy,
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

  /* ── Right side: single reference image (phone + trust card + car scene) ──
     maxWidth is capped so the image can't stretch wider — and therefore
     taller, since it's aspectRatio-locked — than the text column. */
  heroVisualWrap: { flex: 1, alignItems: 'center' },
  heroVisualWrapStacked: { width: '100%' },
  visualInner: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Desktop: this image is a wide landscape scene (car + phone + trust card,
  // aspect ratio ~1.47:1) with real UI text baked in, so it must stay legible
  // — sizing it by WIDTH (like a portrait mockup) either shrinks the text to
  // nothing or, if left unconstrained, blows the height past the text column
  // and reopens the layout gap. Pinning HEIGHT instead and letting width
  // follow the aspect ratio keeps it matched to the text column reliably.
  heroImageDesktop: {
    height: 440,
    width: undefined,
    maxWidth: '100%',
    aspectRatio: HERO_IMG_WIDTH / HERO_IMG_HEIGHT,
  },
  // Mobile/stacked: the column is full-width and there's no neighboring text
  // height to match, so size by width as usual.
  heroImageStacked: {
    width: '100%',
    aspectRatio: HERO_IMG_WIDTH / HERO_IMG_HEIGHT,
  },
});