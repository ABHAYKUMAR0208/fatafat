import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import { Image, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';

const characterImg = require('../../assets/illustrations/help-support-character.png');

const IS_WEB = Platform.OS === 'web';
const BLUE = colors.accentBlue;
const BLUE_DEEP = colors.navy;
const BLUE_ICE = colors.chipBg;
const BLUE_BORDER = 'rgba(51,80,222,0.18)';
const GLASS_BG = 'rgba(255,255,255,0.66)';
const GLASS_BORDER = 'rgba(255,255,255,0.9)';

const POPULAR_TOPICS: { icon: keyof typeof Ionicons.glyphMap; title: string; sub: string }[] = [
  { icon: 'wallet-outline', title: 'Payments & Refunds', sub: 'Fares, refund status' },
  { icon: 'bicycle-outline', title: 'Rides & Bookings', sub: 'Booking, cancellations' },
  { icon: 'shield-checkmark-outline', title: 'Safety & Security', sub: 'Report an issue' },
  { icon: 'person-circle-outline', title: 'Account & Profile', sub: 'Update profile, KYC' },
  { icon: 'gift-outline', title: 'Captain Support', sub: 'Earnings, documents' },
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

function TopicChip({ icon, title, sub, index }: { icon: keyof typeof Ionicons.glyphMap; title: string; sub: string; index: number }) {
  const { hovered, handlers } = useHover();
  return (
    <MotiView
      from={{ opacity: 0, translateY: 14 }}
      animate={{ opacity: 1, translateY: hovered ? -3 : 0 }}
      transition={{ type: 'timing', duration: hovered ? 180 : 420, delay: hovered ? 0 : 260 + index * 70 }}
      style={[styles.topicChip, hovered && styles.topicChipHovered]}
      {...handlers}
    >
      <View style={[styles.topicIconWrap, hovered && styles.topicIconWrapHovered]}>
        <Ionicons name={icon} size={17} color={hovered ? '#FFFFFF' : BLUE} />
      </View>
      <Text style={styles.topicTitle}>{title}</Text>
      <Text style={styles.topicSub}>{sub}</Text>
    </MotiView>
  );
}

export default function HelpHero({ isDesktop = true }: { isDesktop?: boolean }) {
  const [query, setQuery] = useState('');
  const contactHover = useHover();
  const chatHover = useHover();

  return (
    <View style={[styles.hero, !isDesktop && styles.heroStacked]}>
      <View pointerEvents="none" style={styles.glowLayer}>
        <View style={[styles.glowBlob, styles.glowBlobDeep]} />
        <View style={[styles.glowBlob, styles.glowBlobLight]} />
      </View>

      <View style={[styles.heroText, !isDesktop && styles.heroTextStacked]}>
        <View style={styles.badge}>
          <View style={styles.badgeDot} />
          <Text style={styles.badgeLabel}>SUPPORT</Text>
        </View>

        <Text style={[styles.heading, !isDesktop && styles.headingStacked]}>
          Hi, how can we{'\n'}
          <Text style={styles.headingAccent}>help</Text> you?
        </Text>

        <Text style={[styles.lead, !isDesktop && styles.leadStacked]}>
          Find answers, solve issues, or connect with our support team. We're here for you,
          always.
        </Text>

        <View style={styles.searchCard}>
          <Ionicons name="search" size={18} color={colors.bodyMutedOnLight} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search for help (e.g. refund, booking, payment)"
            placeholderTextColor={colors.bodyMutedOnLight}
            style={styles.searchInput}
          />
        </View>

        <View style={[styles.topicsRow, !isDesktop && styles.topicsRowStacked]}>
          {POPULAR_TOPICS.map((t, i) => (
            <TopicChip key={t.title} icon={t.icon} title={t.title} sub={t.sub} index={i} />
          ))}
        </View>

        <View style={styles.ctaRow}>
          <Pressable
            style={[styles.ctaPrimary, contactHover.hovered && styles.ctaPrimaryHovered]}
            {...contactHover.handlers}
          >
            <Ionicons name="headset-outline" size={17} color="#FFFFFF" />
            <Text style={styles.ctaPrimaryText}>Contact Support</Text>
            <Ionicons name="arrow-forward" size={15} color="#FFFFFF" />
          </Pressable>
          <Pressable
            style={[styles.ctaSecondary, chatHover.hovered && styles.ctaSecondaryHovered]}
            {...chatHover.handlers}
          >
            <Ionicons name="chatbubble-ellipses-outline" size={17} color={BLUE} />
            <Text style={styles.ctaSecondaryText}>Chat with us</Text>
          </Pressable>
        </View>
      </View>

      <View style={[styles.heroArtWrap, !isDesktop && styles.heroArtWrapStacked]}>
        <View pointerEvents="none" style={styles.artGlow} />
        <MotiView
          from={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 550, delay: 120 }}
          style={styles.artCard}
        >
          <Image source={characterImg} style={styles.characterImage} resizeMode="contain" />
        </MotiView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 40,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 40,
    position: 'relative',
  },
  heroStacked: { flexDirection: 'column', gap: 32 },

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
  glowBlobLight: { backgroundColor: BLUE, top: -20, right: -60 },

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
    marginBottom: 20,
  },
  badgeDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: BLUE },
  badgeLabel: { fontFamily: fonts.bodyMedium, fontSize: 11.5, letterSpacing: 1, color: BLUE },

  heading: {
    fontFamily: fonts.display,
    fontSize: 44,
    lineHeight: 50,
    letterSpacing: -1,
    color: colors.ink,
    marginBottom: 16,
  },
  headingStacked: { fontSize: 36, lineHeight: 42, textAlign: 'center' },
  headingAccent: { color: BLUE },

  lead: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 26,
    color: colors.bodyMutedOnLight,
    maxWidth: 480,
    marginBottom: 24,
  },
  leadStacked: { textAlign: 'center', maxWidth: '100%', alignSelf: 'center' },

  searchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: GLASS_BG,
    borderWidth: 1,
    borderColor: GLASS_BORDER,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 24,
    maxWidth: 520,
    shadowColor: BLUE_DEEP,
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
    // @ts-ignore -- web-only glass blur, no-op on native
    backdropFilter: IS_WEB ? 'blur(20px) saturate(160%)' : undefined,
  },
  searchInput: { flex: 1, fontFamily: fonts.body, fontSize: 14.5, color: colors.ink, padding: 0 },

  topicsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 28 },
  topicsRowStacked: { justifyContent: 'center' },
  topicChip: {
    width: 128,
    borderRadius: 16,
    padding: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(15,23,42,0.06)',
    // @ts-ignore -- web only
    transitionProperty: 'transform, box-shadow',
    // @ts-ignore -- web only
    transitionDuration: '200ms',
  },
  topicChipHovered: {
    shadowColor: BLUE_DEEP,
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  topicIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: BLUE_ICE,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    // @ts-ignore -- web only
    transitionProperty: 'background-color',
    // @ts-ignore -- web only
    transitionDuration: '200ms',
  },
  topicIconWrapHovered: { backgroundColor: BLUE },
  topicTitle: { fontFamily: fonts.displayMedium, fontSize: 12.5, lineHeight: 16, color: colors.ink, marginBottom: 3 },
  topicSub: { fontFamily: fonts.body, fontSize: 10.5, lineHeight: 14, color: colors.bodyMutedOnLight },

  ctaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  ctaPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: BLUE,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 22,
    // @ts-ignore -- web-only transition, no-op on native
    transitionProperty: 'transform, background-color',
    // @ts-ignore -- web-only transition, no-op on native
    transitionDuration: '180ms',
  },
  ctaPrimaryHovered: { backgroundColor: BLUE_DEEP, transform: [{ translateY: -2 }] },
  ctaPrimaryText: { fontFamily: fonts.displayMedium, fontSize: 14.5, color: '#FFFFFF' },

  ctaSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderWidth: 1.5,
    borderColor: BLUE_BORDER,
    // @ts-ignore -- web-only transition, no-op on native
    transitionProperty: 'transform, background-color',
    // @ts-ignore -- web-only transition, no-op on native
    transitionDuration: '180ms',
  },
  ctaSecondaryHovered: { backgroundColor: BLUE_ICE, transform: [{ translateY: -2 }] },
  ctaSecondaryText: { fontFamily: fonts.displayMedium, fontSize: 14.5, color: BLUE },

  heroArtWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    minHeight: 420,
  },
  heroArtWrapStacked: { width: '100%', minHeight: 320 },

  artGlow: {
    position: 'absolute',
    width: 380,
    height: 380,
    borderRadius: 190,
    backgroundColor: BLUE_ICE,
    opacity: 0.9,
  },

  artCard: {
    width: '100%',
    maxWidth: 420,
    aspectRatio: 746 / 905,
    alignItems: 'center',
    justifyContent: 'center',
  },
  characterImage: { width: '100%', height: '100%' },
});