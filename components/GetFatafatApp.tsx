import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { colors, fonts } from '../constants/theme';

export function StoreBadgeIcon({ kind }: { kind: 'play' | 'apple' }) {
  if (kind === 'apple') {
    return (
      <Svg width={22} height={22} viewBox="0 0 24 24" fill="#FFFFFF">
        <Path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.97 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
      </Svg>
    );
  }
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92z" fill="#4285F4" />
      <Path
        d="M16.982 10.17l-3.19-1.842L5.386 12l8.406 3.672 3.19-1.842a.999.999 0 000-1.738v-.002z"
        fill="#34A853"
      />
      <Path d="M5.386 2L13.792 6.17l-3.19 1.842-5.216-5.01A1.003 1.003 0 015.386 2z" fill="#FBBC04" />
      <Path d="M5.386 22l5.216-5.01 3.19 1.842L5.386 22z" fill="#EA4335" />
    </Svg>
  );
}

function PhoneMockup() {
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

  const translateY = floatY.interpolate({ inputRange: [0, 1], outputRange: [0, -12] });

  return (
    <Animated.View style={[styles.phoneMockup, { transform: [{ translateY }] }]}>
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
          <Ionicons name="search" size={13} color="#94A3B8" />
          <Text style={styles.screenSearchText}>Where are you going?</Text>
        </View>

        <View style={styles.screenMapArea}>
          <View style={styles.screenMapPin}>
            <Svg width={22} height={28} viewBox="0 0 28 36">
              <Path
                d="M14 0C6.27 0 0 6.27 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.27 21.73 0 14 0z"
                fill="#3350DE"
              />
              <Circle cx={14} cy={14} r={5} fill="#FFFFFF" />
            </Svg>
            <View style={styles.pinShadow} />
          </View>
        </View>

        <View style={styles.screenBottomNav}>
          <View style={styles.navItem}>
            <Ionicons name="home-outline" size={15} color="#94A3B8" />
            <Text style={styles.navItemText}>Home</Text>
          </View>
          <View style={styles.navItem}>
            <Ionicons name="car-sport" size={15} color={colors.accentBlue} />
            <Text style={[styles.navItemText, styles.navItemActiveText]}>Ride</Text>
          </View>
          <View style={styles.navItem}>
            <Ionicons name="document-text-outline" size={15} color="#94A3B8" />
            <Text style={styles.navItemText}>Activity</Text>
          </View>
          <View style={styles.navItem}>
            <Ionicons name="person-outline" size={15} color="#94A3B8" />
            <Text style={styles.navItemText}>Profile</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

export default function GetFatafatApp() {
  return (
    <LinearGradient
      colors={['#0F172A', '#1E293B', '#0F2847']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.ctaCard}
    >
      <View style={styles.ctaContent}>
        <View style={styles.ctaLabel}>
          <Text style={styles.ctaSparkle}>✦</Text>
          <Text style={styles.ctaLabelText}>NOW AVAILABLE</Text>
        </View>

        <Text style={styles.ctaHeading}>
          Get the <Text style={styles.ctaHeadingGradient}>Fatafat App</Text>
        </Text>

        <Text style={styles.ctaDescription}>
          Available now for Android and iOS across Delhi NCR. Book affordable rides in seconds,
          track your driver in real-time, and ride safely.
        </Text>

        <View style={styles.ctaButtons}>
          <View style={styles.storeBtn}>
            <View style={styles.storeBtnIcon}>
              <StoreBadgeIcon kind="play" />
            </View>
            <View>
              <Text style={styles.storeBtnSmall}>GET IT ON</Text>
              <Text style={styles.storeBtnName}>Google Play</Text>
            </View>
          </View>
          <View style={styles.storeBtn}>
            <View style={styles.storeBtnIcon}>
              <StoreBadgeIcon kind="apple" />
            </View>
            <View>
              <Text style={styles.storeBtnSmall}>DOWNLOAD ON THE</Text>
              <Text style={styles.storeBtnName}>App Store</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.ctaVisual}>
        <PhoneMockup />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  ctaCard: {
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
    marginVertical: 40,
    borderRadius: 32,
    overflow: 'hidden',
  },
  ctaContent: {
    padding: 44,
  },
  ctaLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginBottom: 22,
  },
  ctaSparkle: {
    color: '#94A3B8',
    fontSize: 12,
  },
  ctaLabelText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 1,
    color: '#94A3B8',
  },
  ctaHeading: {
    fontFamily: fonts.display,
    fontSize: 32,
    lineHeight: 38,
    color: '#FFFFFF',
    marginBottom: 14,
  },
  ctaHeadingGradient: {
    color: '#8FC6FF',
  },
  ctaDescription: {
    fontFamily: fonts.body,
    fontSize: 15.5,
    lineHeight: 25,
    color: 'rgba(148,163,184,0.9)',
    marginBottom: 30,
  },
  ctaButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  storeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  storeBtnIcon: {
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeBtnSmall: {
    fontFamily: fonts.bodyMedium,
    fontSize: 9,
    letterSpacing: 0.5,
    color: '#94A3B8',
    textTransform: 'uppercase',
  },
  storeBtnName: {
    fontFamily: fonts.displayMedium,
    fontSize: 15.5,
    color: '#FFFFFF',
    marginTop: 1,
  },
  ctaVisual: {
    alignItems: 'center',
    paddingBottom: 44,
  },
  phoneMockup: {
    width: 220,
    height: 440,
    borderRadius: 36,
    backgroundColor: '#0F172A',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 24 },
    elevation: 10,
  },
  phoneNotch: {
    position: 'absolute',
    top: 0,
    left: '50%',
    marginLeft: -50,
    width: 100,
    height: 22,
    backgroundColor: '#0F172A',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    zIndex: 10,
  },
  phoneScreen: {
    flex: 1,
    margin: 10,
    borderRadius: 26,
    overflow: 'hidden',
    backgroundColor: '#16213e',
  },
  screenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 30,
    paddingHorizontal: 14,
    paddingBottom: 12,
  },
  screenGreeting: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
  },
  screenUser: {
    fontFamily: fonts.displayMedium,
    fontSize: 14,
    color: '#FFFFFF',
  },
  screenAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.accentBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenAvatarText: {
    fontFamily: fonts.displayMedium,
    fontSize: 12,
    color: '#FFFFFF',
  },
  screenSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 14,
    marginBottom: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  screenSearchText: {
    fontFamily: fonts.body,
    fontSize: 11.5,
    color: 'rgba(255,255,255,0.3)',
  },
  screenMapArea: {
    marginHorizontal: 14,
    height: 130,
    borderRadius: 14,
    backgroundColor: 'rgba(51,80,222,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenMapPin: {
    alignItems: 'center',
  },
  pinShadow: {
    width: 14,
    height: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(51,80,222,0.3)',
    marginTop: 2,
  },
  screenBottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 18,
    backgroundColor: 'rgba(15,23,42,0.92)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  navItem: {
    alignItems: 'center',
    gap: 3,
  },
  navItemText: {
    fontFamily: fonts.body,
    fontSize: 9,
    color: '#94A3B8',
  },
  navItemActiveText: {
    color: colors.accentBlue,
  },
});