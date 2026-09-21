import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Line, Rect } from 'react-native-svg';

const AnimatedLine = Animated.createAnimatedComponent(Line);

/** Shared by HeroCarousel (to anchor illustrations) and TreesLayer (to anchor trunks). */
export const ROAD_HEIGHT = 32;

export default function RoadLayer() {
  const dashOffset = useSharedValue(0);

  useEffect(() => {
    dashOffset.value = withRepeat(
      withTiming(48, { duration: 1600, easing: Easing.linear }),
      -1,
      false
    );
  }, [dashOffset]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: dashOffset.value,
  }));

  return (
    <View style={styles.wrap} pointerEvents="none">
      <Svg width="100%" height={ROAD_HEIGHT}>
        {/* asphalt surface */}
        <Rect x={0} y={0} width="100%" height={ROAD_HEIGHT} fill="#1B1D22" fillOpacity={0.94} />
        {/* subtle top edge highlight, like a curb catching light */}
        <Rect x={0} y={0} width="100%" height={2} fill="rgba(255,255,255,0.16)" />
        {/* dashed lane line, gently animated to suggest forward motion */}
        <AnimatedLine
          x1={0}
          y1={ROAD_HEIGHT / 2 + 4}
          x2={2000}
          y2={ROAD_HEIGHT / 2 + 4}
          stroke="rgba(255,255,255,0.5)"
          strokeWidth={2}
          strokeDasharray="16 12"
          animatedProps={animatedProps}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: ROAD_HEIGHT,
    overflow: 'hidden',
  },
});