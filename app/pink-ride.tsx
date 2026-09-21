import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import PinkRideScene from '../components/pink-ride/PinkRideScene';
import LadyCabScene from '../components/pink-ride/Ladycabscene';
import CompareOptions from '../components/pink-ride/CompareOptions';
import LadySafetyTrust from '../components/pink-ride/LadySafetyTrust';
import LadyCaptainEligibility from '../components/pink-ride/LadyCaptainEligibility';
import LadyCaptainEarnings from '../components/pink-ride/LadyCaptainEarnings';
import LadyFAQ from '../components/pink-ride/LadyFAQ';
import LadyRiderMission from '@/components/pink-ride/Ladyridermission';
import OperatingHoursBanner from '../components/pink-ride/OperatingHoursBanner';
import SiteHeader, { HEADER_HEIGHT } from '../components/Shared/SiteHeader';
import Footer from '../components/Shared/Footer';
import { StoreBadgeIcon } from '@/components/GetFatafatApp';
import { colors, fonts } from '../constants/theme';

const IS_WEB = Platform.OS === 'web';
const DESKTOP_BREAKPOINT = 900;

const FEATURES = [
  { icon: 'shield-checkmark-outline' as const, label: 'ID + medical fitness verified' },
  { icon: 'time-outline' as const, label: '7:45 AM – 8:00 PM' },
  { icon: 'pricetag-outline' as const, label: 'No fare premium' },
];

function FeaturePill({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
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
    <View style={styles.feature} {...hoverHandlers}>
      <View style={[styles.featureIcon, hovered && styles.featureIconHovered]}>
        <Ionicons name={icon} size={18} color={hovered ? '#FFFFFF' : colors.magenta} />
      </View>
      <Text style={styles.featureLabel}>{label}</Text>
    </View>
  );
}

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

export default function PinkRidePage() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= DESKTOP_BREAKPOINT;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <SiteHeader />

        <View style={[styles.hero, !isDesktop && styles.heroStacked]}>
          <View style={[styles.heroText, !isDesktop && styles.heroTextStacked]}>
            <View style={styles.badge}>
              <View style={styles.badgeDot} />
              <Text style={styles.badgeLabel}>VERIFIED WOMEN, BOTH SIDES</Text>
            </View>

            <Text style={styles.heading}>
              Ride with confidence.{'\n'}
              <Text style={styles.headingAccent}>Drive with freedom.</Text>
            </Text>

            <Text style={styles.lead}>
              Two ways to travel with a woman behind the wheel: choose a{' '}
              <Text style={styles.leadBold}>Lady Cab Driver</Text> for a comfortable car ride, or
              book <Text style={styles.leadBold}>Pink Scooty</Text> — where both driver and
              passenger are women, every time. Bookable{' '}
              <Text style={styles.leadBold}>7:45 AM to 8:00 PM</Text>.
            </Text>

            <View style={styles.storeRow}>
              <StoreButton kind="play" small="GET IT ON" big="Google Play" />
              <StoreButton kind="apple" small="Download on the" big="App Store" />
            </View>

            <View style={styles.featuresRow}>
              {FEATURES.map((f) => (
                <FeaturePill key={f.label} icon={f.icon} label={f.label} />
              ))}
            </View>
          </View>

          <View style={[styles.heroCardWrap, !isDesktop && styles.heroCardWrapStacked]}>
            <PinkRideScene />
          </View>
        </View>

        <View style={[styles.promiseSection, !isDesktop && styles.promiseSectionStacked]}>
          <View style={[styles.promiseCardWrap, !isDesktop && styles.promiseCardWrapStacked]}>
            <LadyCabScene />
          </View>

          <View style={styles.promiseText}>
            <View style={styles.badge}>
              <View style={styles.badgeDot} />
              <Text style={styles.badgeLabel}>OUR PROMISE</Text>
            </View>

            <Text style={styles.promiseHeading}>For women.</Text>

            <Text style={styles.promiseLead}>
              Every Lady Rider trip is built around one idea: travel should feel{' '}
              <Text style={styles.leadBold}>safe</Text> before it feels convenient. From the
              moment you book to the moment you arrive, you're in a space designed specifically
              around your comfort and confidence.
            </Text>

            <Text style={styles.promiseLead}>
              A verified woman rider, matched with a verified{' '}
              <Text style={styles.promiseLeadAccent}>Lady Captain</Text>, every single time.
              Because peace of mind shouldn't be the exception on your commute — it should be
              the default.
            </Text>

            <Pressable style={styles.promiseCta}>
              <Text style={styles.promiseCtaText}>See how it works</Text>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>

        <LadyRiderMission isDesktop={isDesktop} />

        <CompareOptions isDesktop={isDesktop} />
        <OperatingHoursBanner isDesktop={isDesktop} />
        <LadySafetyTrust />
        <LadyCaptainEligibility isDesktop={isDesktop} />
        <LadyCaptainEarnings isDesktop={isDesktop} />
        <LadyFAQ />
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  scroll: { paddingTop: HEADER_HEIGHT },

  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 48,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  heroStacked: {
    flexDirection: 'column-reverse',
    gap: 32,
  },

  heroText: { flex: 1 },
  heroTextStacked: { width: '100%' },

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
    borderColor: 'rgba(236,72,153,0.18)',
  },
  badgeDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.magenta },
  badgeLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11.5,
    letterSpacing: 1,
    color: '#BE185D',
  },

  heading: {
    fontFamily: fonts.display,
    fontSize: 42,
    lineHeight: 46,
    letterSpacing: -1,
    color: colors.ink,
    marginTop: 20,
    marginBottom: 16,
  },
  headingAccent: { color: colors.magenta },

  lead: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 26,
    color: colors.bodyMutedOnLight,
    maxWidth: 520,
    marginBottom: 26,
  },
  leadBold: { fontFamily: fonts.bodyMedium, color: colors.ink },

  storeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 30 },
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
  storeBtnHovered: {
    backgroundColor: '#000000',
    transform: [{ translateY: -2 }],
  },
  storeBtnSmall: {
    fontFamily: fonts.body,
    fontSize: 9.5,
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: 0.4,
  },
  storeBtnBig: { fontFamily: fonts.displayMedium, fontSize: 14.5, color: '#FFFFFF', marginTop: 1 },

  featuresRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 20 },
  feature: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(236,72,153,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    // @ts-ignore -- web-only transition, no-op on native
    transitionProperty: 'background-color, transform',
    // @ts-ignore -- web-only transition, no-op on native
    transitionDuration: '200ms',
  },
  featureIconHovered: {
    backgroundColor: colors.magenta,
    transform: [{ translateY: -3 }, { rotate: '-6deg' }],
  },
  featureLabel: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.ink },

  heroCardWrap: { flex: 1 },
  heroCardWrapStacked: { width: '100%' },

  promiseSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 56,
    paddingHorizontal: 24,
    paddingVertical: 56,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  promiseSectionStacked: {
    flexDirection: 'column',
    gap: 32,
  },
  promiseCardWrap: {
    flex: 1,
  },
  promiseCardWrapStacked: {
    width: '100%',
  },
  promiseText: {
    flex: 1,
    maxWidth: 480,
  },
  promiseHeading: {
    fontFamily: fonts.display,
    fontSize: 44,
    lineHeight: 48,
    letterSpacing: -1.2,
    color: colors.ink,
    marginTop: 20,
    marginBottom: 20,
  },
  promiseLead: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 26,
    color: colors.bodyMutedOnLight,
    marginBottom: 16,
  },
  promiseLeadAccent: {
    fontFamily: fonts.bodyMedium,
    color: colors.magenta,
  },
  promiseCta: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 8,
    backgroundColor: colors.magenta,
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginTop: 8,
  },
  promiseCtaText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 15,
    color: '#FFFFFF',
  },
});