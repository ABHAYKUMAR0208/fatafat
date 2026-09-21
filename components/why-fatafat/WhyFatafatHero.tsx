import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';
import StoreButtons from '../Shared/StoreButtons';

const IS_WEB = Platform.OS === 'web';

const BLUE = colors.accentBlue;
const BLUE_DEEP = colors.navy;
const BLUE_ICE = colors.chipBg;
const BLUE_BORDER = 'rgba(51,80,222,0.18)';
const GLASS_BG = 'rgba(255,255,255,0.7)';
const GLASS_BORDER = 'rgba(255,255,255,0.9)';

const STATS = [
  { value: '500K+', label: 'Downloads' },
  { value: '50K+', label: 'Happy riders' },
  { value: '4.9', label: 'Average rating', icon: 'star' as const },
];

// const TRUSTED_BY = ['Northbridge', 'Acme Co.', 'Contoso', 'Globex', 'Umbrella'];

function PhoneScene() {
  return (
    <View style={styles.sceneWrap}>
      <View pointerEvents="none" style={styles.sceneGlowLayer}>
        <View style={[styles.sceneGlow, styles.sceneGlowDeep]} />
        <View style={[styles.sceneGlow, styles.sceneGlowLight]} />
      </View>

      {/* Floating chip: verified captain */}
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 500 }}
        style={[styles.floatChip, styles.floatChipTop]}
      >
        <View style={styles.floatChipIcon}>
          <Ionicons name="shield-checkmark" size={13} color="#FFFFFF" />
        </View>
        <View>
          <Text style={styles.floatChipTitle}>Verified captain</Text>
          <Text style={styles.floatChipSub}>ID + vehicle checked</Text>
        </View>
      </MotiView>

      <View style={styles.phone}>
        <View style={styles.phoneNotch} />
        <View style={styles.phoneScreen}>
          <View style={styles.screenHeader}>
            <Text style={styles.screenBrand}>Fatafat</Text>
            <View style={styles.screenDots}>
              <View style={styles.screenDot} />
              <View style={styles.screenDot} />
              <View style={styles.screenDot} />
            </View>
          </View>

          <View style={styles.mapArea}>
            <View style={styles.mapGridRow} />
            <View style={[styles.mapGridRow, { top: '62%' }]} />
            <View style={styles.routeLine} />
            <View style={styles.routeStart} />
            <View style={styles.routeCar}>
              <Ionicons name="car-sport" size={13} color="#FFFFFF" />
            </View>
            <View style={styles.routePin}>
              <Ionicons name="location" size={20} color={BLUE} />
            </View>
          </View>

          <View style={styles.tripCard}>
            <View style={styles.tripAvatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.tripTitle}>Arriving in 4 min</Text>
              <Text style={styles.tripSub}>Rohan · WagonR · DL 4C AB 1234</Text>
            </View>
            <View style={styles.tripRatingChip}>
              <Ionicons name="star" size={10} color={BLUE} />
              <Text style={styles.tripRatingText}>4.9</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Floating chip: rating bubble */}
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 650 }}
        style={[styles.floatChip, styles.floatChipBottom]}
      >
        <View style={styles.floatChipRatingIcon}>
          <Ionicons name="flash" size={13} color={BLUE} />
        </View>
        <View>
          <Text style={styles.floatChipTitle}>Live tracking</Text>
          <Text style={styles.floatChipSub}>Every ride, start to finish</Text>
        </View>
      </MotiView>
    </View>
  );
}

export default function WhyFatafatHero({ isDesktop }: { isDesktop: boolean }) {
  return (
    <View style={styles.wrap}>
      <View style={[styles.hero, !isDesktop && styles.heroStacked]}>
        <View pointerEvents="none" style={styles.glowLayer}>
          <View style={[styles.glowBlob, styles.glowBlobDeep]} />
          <View style={[styles.glowBlob, styles.glowBlobLight]} />
        </View>

        <View style={[styles.heroText, !isDesktop && styles.heroTextStacked]}>
          <MotiView
            from={{ opacity: 0, translateY: 14 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 450 }}
          >
            <View style={styles.badge}>
              <View style={styles.badgeDot} />
              <Text style={styles.badgeLabel}>WHY FATAFAT</Text>
            </View>

            <Text style={styles.heading}>
              Built for you,{'\n'}
              <Text style={styles.headingAccent}>fair fares, real safety.</Text>
            </Text>

            <Text style={styles.lead}>
              Every ride on Fatafat is shaped by four promises — transparent pricing, guaranteed
              best fares, a built-in safety hub, and family-grade insurance for every captain on
              the road.
            </Text>

            <View style={styles.statsRow}>
              {STATS.map((s, i) => (
                <React.Fragment key={s.label}>
                  {i > 0 && <View style={styles.statDivider} />}
                  <View style={styles.statItem}>
                    <View style={styles.statValueRow}>
                      {s.icon && <Ionicons name={s.icon} size={15} color={BLUE} style={{ marginRight: 4 }} />}
                      <Text style={styles.statValue}>{s.value}</Text>
                    </View>
                    <Text style={styles.statLabel}>{s.label}</Text>
                  </View>
                </React.Fragment>
              ))}
            </View>

            <StoreButtons />
          </MotiView>
        </View>

        <View style={[styles.heroSceneWrap, !isDesktop && styles.heroSceneWrapStacked]}>
          <PhoneScene />
        </View>
      </View>

      <View style={styles.trustedRow}>
        <Text style={styles.trustedLabel}>TRUSTED BY THOUSANDS ACROSS THE CITY</Text>
        <View style={[styles.trustedLogos, !isDesktop && styles.trustedLogosStacked]}>
          {/* {TRUSTED_BY.map((name) => (
            <Text key={name} style={styles.trustedLogo}>
              {name}
            </Text> */}
          {/* ))} */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { maxWidth: 1200, width: '100%', alignSelf: 'center' },

  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 48,
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 40,
    position: 'relative',
  },
  heroStacked: { flexDirection: 'column-reverse', gap: 40 },

  glowLayer: { ...StyleSheet.absoluteFillObject, overflow: 'hidden' },
  glowBlob: { position: 'absolute', width: 360, height: 360, borderRadius: 180, opacity: 0.14 },
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
    marginBottom: 20,
  },
  badgeDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: BLUE },
  badgeLabel: { fontFamily: fonts.bodyMedium, fontSize: 11.5, letterSpacing: 1, color: BLUE },

  heading: {
    fontFamily: fonts.display,
    fontSize: 40,
    lineHeight: 46,
    letterSpacing: -1,
    color: colors.ink,
    marginBottom: 16,
  },
  headingAccent: { color: BLUE },

  lead: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 26,
    color: colors.bodyMutedOnLight,
    maxWidth: 520,
    marginBottom: 28,
  },

  statsRow: { flexDirection: 'row', alignItems: 'center', gap: 20, marginBottom: 8 },
  statItem: {},
  statValueRow: { flexDirection: 'row', alignItems: 'center' },
  statValue: { fontFamily: fonts.display, fontSize: 22, color: colors.ink },
  statLabel: { fontFamily: fonts.body, fontSize: 12, color: colors.bodyMutedOnLight, marginTop: 2 },
  statDivider: { width: 1, height: 32, backgroundColor: colors.border },

  heroSceneWrap: { flex: 1, alignItems: 'center' },
  heroSceneWrapStacked: { width: '100%' },

  sceneWrap: { width: '100%', maxWidth: 340, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  sceneGlowLayer: { ...StyleSheet.absoluteFillObject, overflow: 'hidden' },
  sceneGlow: { position: 'absolute', width: 260, height: 260, borderRadius: 130, opacity: 0.18 },
  sceneGlowDeep: { backgroundColor: BLUE_DEEP, top: 20, left: -20 },
  sceneGlowLight: { backgroundColor: BLUE, bottom: 20, right: -20 },

  phone: {
    width: 250,
    height: 500,
    borderRadius: 40,
    backgroundColor: BLUE_DEEP,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
    shadowColor: BLUE_DEEP,
    shadowOpacity: 0.28,
    shadowRadius: 44,
    shadowOffset: { width: 0, height: 26 },
    elevation: 10,
  },
  phoneNotch: {
    position: 'absolute',
    top: 0,
    left: '50%',
    marginLeft: -50,
    width: 100,
    height: 22,
    backgroundColor: BLUE_DEEP,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    zIndex: 10,
  },
  phoneScreen: {
    flex: 1,
    margin: 10,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },

  screenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 30,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  screenBrand: { fontFamily: fonts.displayMedium, fontSize: 15, color: colors.ink },
  screenDots: { flexDirection: 'row', gap: 3 },
  screenDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: 'rgba(15,23,42,0.25)' },

  mapArea: {
    marginHorizontal: 14,
    height: 250,
    borderRadius: 18,
    backgroundColor: BLUE_ICE,
    overflow: 'hidden',
    position: 'relative',
  },
  mapGridRow: { position: 'absolute', top: '32%', left: 0, right: 0, height: 1, backgroundColor: 'rgba(51,80,222,0.08)' },
  routeLine: {
    position: 'absolute',
    top: 34,
    left: 30,
    width: 3,
    height: 150,
    borderRadius: 2,
    backgroundColor: 'rgba(51,80,222,0.28)',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'rgba(51,80,222,0.4)',
    transform: [{ rotate: '18deg' }],
  },
  routeStart: {
    position: 'absolute',
    top: 26,
    left: 22,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: BLUE_DEEP,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  routeCar: {
    position: 'absolute',
    top: 108,
    left: 78,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: BLUE_DEEP,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  routePin: {
    position: 'absolute',
    bottom: 24,
    right: 26,
  },

  tripCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 14,
    marginTop: 12,
    backgroundColor: GLASS_BG,
    borderWidth: 1,
    borderColor: GLASS_BORDER,
    borderRadius: 16,
    padding: 12,
    shadowColor: BLUE_DEEP,
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    // @ts-ignore -- web-only glass blur, no-op on native
    backdropFilter: IS_WEB ? 'blur(14px) saturate(150%)' : undefined,
  },
  tripAvatar: { width: 34, height: 34, borderRadius: 17, backgroundColor: BLUE_ICE },
  tripTitle: { fontFamily: fonts.bodyMedium, fontSize: 12.5, color: colors.ink },
  tripSub: { fontFamily: fonts.body, fontSize: 10.5, color: colors.bodyMutedOnLight, marginTop: 2 },
  tripRatingChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: BLUE_ICE,
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  tripRatingText: { fontFamily: fonts.bodyMedium, fontSize: 11, color: BLUE },

  floatChip: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: GLASS_BG,
    borderWidth: 1,
    borderColor: GLASS_BORDER,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    shadowColor: BLUE_DEEP,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
    zIndex: 5,
    // @ts-ignore -- web-only glass blur, no-op on native
    backdropFilter: IS_WEB ? 'blur(16px) saturate(160%)' : undefined,
  },
  floatChipTop: { top: 40, left: -10 },
  floatChipBottom: { bottom: 60, right: -14 },
  floatChipIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatChipRatingIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: BLUE_ICE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatChipTitle: { fontFamily: fonts.bodyMedium, fontSize: 12, color: colors.ink },
  floatChipSub: { fontFamily: fonts.body, fontSize: 10, color: colors.bodyMutedOnLight, marginTop: 1 },

  trustedRow: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  trustedLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 1.5,
    color: colors.bodyMutedOnLight,
    marginBottom: 20,
  },
  trustedLogos: { flexDirection: 'row', flexWrap: 'wrap', gap: 32, justifyContent: 'center' },
  trustedLogosStacked: { gap: 20 },
  trustedLogo: {
    fontFamily: fonts.displayMedium,
    fontSize: 16,
    color: 'rgba(27,16,53,0.32)',
    letterSpacing: -0.2,
  },
});
