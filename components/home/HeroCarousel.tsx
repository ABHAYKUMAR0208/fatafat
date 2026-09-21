import { LinearGradient } from 'expo-linear-gradient';
import { AnimatePresence, MotiView } from 'moti';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { HeroSlide, heroSlides } from '../../constants/heroSlides';
import { colors, fonts } from '../../constants/theme';
import CloudsLayer from './illustrations/CloudsLayer';
import RoadLayer, { ROAD_HEIGHT } from './illustrations/RoadLayer';
import TreesLayer from './illustrations/TreesLayer';

const CROSSFADE_DURATION = 700;

function SceneLayer({ slide, active }: { slide: HeroSlide; active: boolean }) {
  const opacity = useSharedValue(active ? 1 : 0);

  useEffect(() => {
    opacity.value = withTiming(active ? 1 : 0, { duration: CROSSFADE_DURATION });
  }, [active, opacity]);

  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));
  const Illustration = slide.Illustration;

  return (
    <Animated.View style={[StyleSheet.absoluteFill, style]} pointerEvents="none">
      <LinearGradient colors={[slide.skyTop, slide.skyBottom]} style={StyleSheet.absoluteFill} />
      <CloudsLayer />
      <TreesLayer />
      <View style={styles.illustrationDock}>
        <Illustration accent={slide.accent} />
      </View>
    </Animated.View>
  );
}

type Props = {
  /** Which slide is showing, owned by the parent (HeroSection) so the left-column copy can stay in sync. */
  activeIndex: number;
};

export default function HeroCarousel({ activeIndex }: Props) {
  const active = heroSlides[activeIndex];

  return (
    <View style={styles.container}>
      {heroSlides.map((slide, i) => (
        <SceneLayer key={slide.id} slide={slide} active={i === activeIndex} />
      ))}

      <RoadLayer />

      <View style={styles.textDock}>
        <AnimatePresence exitBeforeEnter>
          <MotiView
            key={active.id}
            from={{ opacity: 0, translateY: 14 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -14 }}
            transition={{ type: 'timing', duration: 450 }}
          >
            <Text style={styles.eyebrow}>{active.eyebrow}</Text>
            <Text style={styles.title}>{active.title}</Text>
            <Text style={styles.subtitle}>{active.subtitle}</Text>
          </MotiView>
        </AnimatePresence>

        <View style={styles.dots}>
          {heroSlides.map((slide, i) => (
            <View key={slide.id} style={[styles.dot, i === activeIndex && styles.dotActive]} />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 3 / 2,
    maxHeight: 560,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: colors.ink,
  },

  illustrationDock: {
    position: 'absolute',
    bottom: ROAD_HEIGHT - 12,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  textDock: {
    position: 'absolute',
    top: 26,
    left: 24,
    right: 24,
  },
  eyebrow: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    letterSpacing: 2,
    color: colors.textMuted,
    marginBottom: 8,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 26,
    lineHeight: 32,
    color: colors.textOnDark,
    marginBottom: 8,
    maxWidth: 260,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textMuted,
    maxWidth: 260,
  },
  dots: {
    flexDirection: 'row',
    marginTop: 18,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 248, 240, 0.3)',
  },
  dotActive: {
    backgroundColor: colors.secondaryBlue,
    width: 20,
  },
});