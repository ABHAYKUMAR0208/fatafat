import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';
import { StoreBadgeIcon } from '../GetFatafatApp';

const IS_WEB = Platform.OS === 'web';

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

function StoreButtonLight({ kind, small, big }: { kind: 'play' | 'apple'; small: string; big: string }) {
  const { hovered, handlers } = useHover();
  return (
    <Pressable style={[styles.storeBtn, hovered && styles.storeBtnHovered]} {...handlers}>
      <StoreBadgeIcon kind={kind} />
      <View>
        <Text style={styles.storeSmall}>{small}</Text>
        <Text style={styles.storeBig}>{big}</Text>
      </View>
    </Pressable>
  );
}

export default function CarpoolCTA() {
  return (
    <View style={styles.section}>
      <LinearGradient
        colors={[colors.navy, colors.accentBlue, '#1E9BE0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.banner}
      >
        <View style={styles.badge}>
          <Ionicons name="flash-outline" size={13} color="#FFFFFF" />
          <Text style={styles.badgeLabel}>Available now</Text>
        </View>
        <Text style={styles.heading}>Ready to share a ride?</Text>
        <Text style={styles.body}>
          Search a route, or publish your own — available now on Android and iOS.
        </Text>
        <View style={styles.storeRow}>
          <StoreButtonLight kind="play" small="GET IT ON" big="Google Play" />
          <StoreButtonLight kind="apple" small="Download on the" big="App Store" />
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 24, paddingVertical: 48, maxWidth: 1200, width: '100%', alignSelf: 'center' },

  banner: { borderRadius: 28, padding: 40, alignItems: 'center' },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 999,
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.24)',
  },
  badgeLabel: { fontFamily: fonts.bodyMedium, fontSize: 11.5, letterSpacing: 1, color: 'rgba(255,255,255,0.92)', textTransform: 'uppercase' },
  heading: { fontFamily: fonts.display, fontSize: 32, lineHeight: 38, color: '#FFFFFF', marginTop: 18, textAlign: 'center' },
  body: { fontFamily: fonts.body, fontSize: 15, lineHeight: 24, color: 'rgba(255,255,255,0.78)', marginTop: 12, textAlign: 'center', maxWidth: 460 },

  storeRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginTop: 28 },
  storeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.24)',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 18,
    // @ts-ignore -- web-only transition, no-op on native
    transitionProperty: 'background-color, transform',
    // @ts-ignore -- web-only transition, no-op on native
    transitionDuration: '200ms',
  },
  storeBtnHovered: { backgroundColor: 'rgba(255,255,255,0.22)', transform: [{ translateY: -2 }] },
  storeSmall: { fontFamily: fonts.body, fontSize: 9.5, color: 'rgba(255,255,255,0.72)', letterSpacing: 0.4 },
  storeBig: { fontFamily: fonts.displayMedium, fontSize: 14.5, color: '#FFFFFF', marginTop: 1 },
});