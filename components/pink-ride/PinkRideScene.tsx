import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Ellipse, Line } from 'react-native-svg';
import { colors, fonts } from '../../constants/theme';

const AnimatedLine = Animated.createAnimatedComponent(Line);

const scootyImg = require('../../assets/illustrations/pink-scooty.png');
const SCOOTY_ASPECT = 415 / 362;

const ROAD_HEIGHT_PCT = 0.3; // bottom 30% of the card is road

// ---------- small looping helpers ----------

function usePulse(duration = 1800, delay = 0) {
  const v = useSharedValue(0);
  useEffect(() => {
    v.value = withDelay(
      delay,
      withRepeat(withTiming(1, { duration, easing: Easing.inOut(Easing.ease) }), -1, true)
    );
  }, []);
  return v;
}

function useLoop(duration: number, delay = 0) {
  const v = useSharedValue(0);
  useEffect(() => {
    v.value = withDelay(delay, withRepeat(withTiming(1, { duration, easing: Easing.linear }), -1, false));
  }, []);
  return v;
}

// ---------- sky elements ----------

function Sun() {
  const pulse = usePulse(2400);
  const style = useAnimatedStyle(() => ({
    opacity: 0.75 + pulse.value * 0.25,
    transform: [{ scale: 1 + pulse.value * 0.06 }],
  }));
  return (
    <Animated.View style={[styles.sun, style]}>
      <Svg width={64} height={64}>
        <Circle cx={32} cy={32} r={30} fill="#FBBF24" />
        <Circle cx={26} cy={24} r={16} fill="#FEF3C7" opacity={0.55} />
      </Svg>
    </Animated.View>
  );
}

function Cloud({
  top,
  scale,
  opacity,
  duration,
  delay,
  sceneWidth,
}: {
  top: number;
  scale: number;
  opacity: number;
  duration: number;
  delay: number;
  sceneWidth: number;
}) {
  const t = useLoop(duration, delay);
  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: sceneWidth + 80 - t.value * (sceneWidth + 160) }],
  }));
  return (
    <Animated.View style={[{ position: 'absolute', top, left: 0 }, style]} pointerEvents="none">
      <Svg width={90} height={40}>
        <Ellipse cx={30} cy={26} rx={26} ry={12} fill="#FFFFFF" opacity={opacity} transform={`scale(${scale})`} />
        <Ellipse cx={50} cy={20} rx={17} ry={10} fill="#FFFFFF" opacity={opacity} transform={`scale(${scale})`} />
        <Ellipse cx={14} cy={22} rx={14} ry={9} fill="#FFFFFF" opacity={opacity} transform={`scale(${scale})`} />
      </Svg>
    </Animated.View>
  );
}

function Sparkle({ top, left, delay }: { top: number; left: number; delay: number }) {
  const pulse = usePulse(2000, delay);
  const style = useAnimatedStyle(() => ({
    opacity: pulse.value,
    transform: [{ scale: 0.6 + pulse.value * 0.8 }],
  }));
  return <Animated.View style={[styles.sparkle, { top, left }, style]} pointerEvents="none" />;
}

// ---------- roadside trees sweeping past ----------

function SweepingTree({ size, top, duration, delay, sceneWidth }: {
  size: number;
  top: number;
  duration: number;
  delay: number;
  sceneWidth: number;
}) {
  const t = useLoop(duration, delay);
  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: sceneWidth + size - t.value * (sceneWidth + size * 2) }],
  }));
  return (
    <Animated.View style={[{ position: 'absolute', top }, style]} pointerEvents="none">
      <Svg width={size} height={size * 1.3}>
        <Ellipse cx={size / 2} cy={size * 0.42} rx={size * 0.4} ry={size * 0.36} fill="#4ADE80" opacity={0.85} />
        <Ellipse cx={size * 0.4} cy={size * 0.32} rx={size * 0.26} ry={size * 0.24} fill="#86EFAC" opacity={0.85} />
        <Circle cx={size / 2} cy={size * 0.95} r={size * 0.05} fill="#78350F" />
      </Svg>
    </Animated.View>
  );
}

// ---------- road ----------

function Road({ sceneWidth, sceneHeight }: { sceneWidth: number; sceneHeight: number }) {
  const roadHeight = sceneHeight * ROAD_HEIGHT_PCT;
  const dashOffset = useSharedValue(0);

  useEffect(() => {
    dashOffset.value = withRepeat(withTiming(64, { duration: 900, easing: Easing.linear }), -1, false);
  }, []);

  const animatedProps = useAnimatedProps(() => ({ strokeDashoffset: dashOffset.value }));
  const animatedPropsSlow = useAnimatedProps(() => ({ strokeDashoffset: dashOffset.value * 0.5 }));

  return (
    <View style={[styles.road, { height: roadHeight }]} pointerEvents="none">
      <Svg width="100%" height={roadHeight}>
        {/* pink top edge glow */}
        <Line x1={0} y1={2} x2={2000} y2={2} stroke={colors.magenta} strokeWidth={4} opacity={0.8} />
        {/* curb dashes */}
        <AnimatedLine
          x1={0}
          y1={10}
          x2={2000}
          y2={10}
          stroke="#FFFFFF"
          strokeWidth={2}
          strokeDasharray="12 12"
          strokeOpacity={0.6}
          animatedProps={animatedPropsSlow}
        />
        {/* center lane stripes */}
        <AnimatedLine
          x1={0}
          y1={roadHeight / 2}
          x2={2000}
          y2={roadHeight / 2}
          stroke="#FBBF24"
          strokeWidth={5}
          strokeDasharray="26 22"
          animatedProps={animatedProps}
        />
      </Svg>
    </View>
  );
}

// ---------- the rider ----------

function Rider({ sceneWidth, roadHeight }: { sceneWidth: number; roadHeight: number }) {
  const bob = useSharedValue(0);
  useEffect(() => {
    bob.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 700, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 700, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      true
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: -bob.value * 4 }],
  }));

  const puddlePulse = usePulse(1400);
  const puddleStyle = useAnimatedStyle(() => ({
    opacity: 0.5 + puddlePulse.value * 0.1,
    transform: [{ scaleX: 1 - puddlePulse.value * 0.08 }],
  }));

  const width = Math.min(sceneWidth * 0.62, 230);
  const height = width / SCOOTY_ASPECT;
  const puddleWidth = width * 0.75;

  return (
    <View style={[styles.riderWrap, { bottom: roadHeight * 0.6 }]} pointerEvents="none">
      <Animated.View
        style={[styles.puddle, { width: puddleWidth, left: '50%', marginLeft: -puddleWidth / 2 }, puddleStyle]}
      />
      <Animated.View style={style}>
        <Image source={scootyImg} style={{ width, height }} resizeMode="contain" />
      </Animated.View>
    </View>
  );
}

function SpeedLines({ sceneWidth, roadHeight }: { sceneWidth: number; roadHeight: number }) {
  const bases = [0, 150, 300, 450];
  return (
    <View
      style={[styles.speedLines, { bottom: roadHeight * 0.6 + 36, left: sceneWidth * 0.06 }]}
      pointerEvents="none"
    >
      {bases.map((delay, i) => (
        <SpeedDash key={i} top={i * 16} width={26 + (i % 2) * 12} delay={delay} />
      ))}
    </View>
  );
}

function SpeedDash({ top, width, delay }: { top: number; width: number; delay: number }) {
  const t = useLoop(650, delay);
  const style = useAnimatedStyle(() => ({
    opacity: t.value < 0.15 ? t.value / 0.15 : t.value > 0.75 ? (1 - t.value) / 0.25 : 1,
    transform: [{ translateX: 40 - t.value * 60 }],
  }));
  return <Animated.View style={[styles.speedDash, { top, width }, style]} />;
}

// ---------- top-level scene ----------

export default function PinkRideScene() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  return (
    <View
      style={styles.cardOuter}
      onLayout={(e) => setSize({ width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height })}
    >
      <View style={styles.tag}>
        <Text style={styles.tagText}>PINK SCOOTY</Text>
      </View>

      <LinearGradient
        colors={['#FFE9F3', '#FFD8E9', '#FFC9DE']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {size.width > 0 && (
        <>
          <Sun />
          <Cloud top={12} scale={1} opacity={0.9} duration={9000} delay={0} sceneWidth={size.width} />
          <Cloud top={44} scale={0.7} opacity={0.55} duration={13000} delay={2500} sceneWidth={size.width} />
          <Cloud top={2} scale={0.5} opacity={0.35} duration={16000} delay={6000} sceneWidth={size.width} />

          <Sparkle top={size.height * 0.22} left={size.width * 0.12} delay={0} />
          <Sparkle top={size.height * 0.4} left={size.width * 0.8} delay={800} />
          <Sparkle top={size.height * 0.62} left={size.width * 0.2} delay={1400} />

          <SweepingTree size={30} top={size.height * (1 - ROAD_HEIGHT_PCT) - 34} duration={6000} delay={0} sceneWidth={size.width} />
          <SweepingTree size={22} top={size.height * (1 - ROAD_HEIGHT_PCT) - 26} duration={9000} delay={1800} sceneWidth={size.width} />
          <SweepingTree size={38} top={size.height * (1 - ROAD_HEIGHT_PCT) - 42} duration={12000} delay={4200} sceneWidth={size.width} />

          <SpeedLines sceneWidth={size.width} roadHeight={size.height * ROAD_HEIGHT_PCT} />
          <Rider sceneWidth={size.width} roadHeight={size.height * ROAD_HEIGHT_PCT} />
          <Road sceneWidth={size.width} sceneHeight={size.height} />
        </>
      )}

      {/* <Text style={styles.caption}>Woman driver · woman passenger · every ride</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  cardOuter: {
    width: '100%',
    aspectRatio: 4 / 3.4,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#FFD8E9',
    // @ts-ignore -- web-only drop shadow
    boxShadow: '0 30px 60px -20px rgba(190, 24, 93, 0.25), 0 12px 24px -8px rgba(15, 23, 42, 0.12)',
  },
  tag: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 6,
    backgroundColor: colors.magenta,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 14,
    // @ts-ignore -- web-only drop shadow
    boxShadow: '0 6px 16px -4px rgba(236,72,153,0.55)',
  },
  tagText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 1,
    color: '#FFFFFF',
  },
  sun: {
    position: 'absolute',
    top: '12%',
    left: '16%',
  },
  sparkle: {
    position: 'absolute',
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  road: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#3A3F55',
    overflow: 'hidden',
  },
  riderWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 5,
  },
  puddle: {
    position: 'absolute',
    bottom: -4,
    height: 12,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.28)',
    // @ts-ignore -- web-only blur for a soft puddle shadow
    filter: 'blur(3px)',
  },
  speedLines: {
    position: 'absolute',
    width: 90,
    height: 70,
    zIndex: 4,
  },
  speedDash: {
    position: 'absolute',
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  caption: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: '#FFFFFF',
    zIndex: 6,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});