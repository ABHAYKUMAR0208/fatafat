import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Ellipse, Rect } from 'react-native-svg';
import { ROAD_HEIGHT } from './RoadLayer';

function Tree({ x, size, delay }: { x: number; size: number; delay: number }) {
  const sway = useSharedValue(0);
  const trunkH = size * 0.4;

  useEffect(() => {
    const timeout = setTimeout(() => {
      sway.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 2200, easing: Easing.inOut(Easing.sin) }),
          withTiming(-1, { duration: 2200, easing: Easing.inOut(Easing.sin) })
        ),
        -1,
        true
      );
    }, delay);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const style = useAnimatedStyle(() => {
    const deg = sway.value * 2.5;
    return {
      // Rotate around the base of the trunk rather than the shape's
      // center, so the canopy sways like it's rooted to the ground.
      transform: [{ translateY: trunkH }, { rotate: `${deg}deg` }, { translateY: -trunkH }],
    };
  });

  return (
    <Animated.View style={[{ position: 'absolute', left: x, bottom: 0 }, style]}>
      <Svg width={size} height={size * 1.3}>
        <Rect x={size * 0.42} y={size * 0.7} width={size * 0.16} height={size * 0.5} rx={2} fill="#161F42" />
        <Ellipse cx={size / 2} cy={size * 0.5} rx={size * 0.42} ry={size * 0.42} fill="#161F42" />
        <Ellipse cx={size * 0.35} cy={size * 0.35} rx={size * 0.28} ry={size * 0.28} fill="#3350DE" />
      </Svg>
    </Animated.View>
  );
}

export default function TreesLayer() {
  return (
    <View
      style={{ position: 'absolute', bottom: ROAD_HEIGHT - 6, left: 0, right: 0, height: 90 }}
      pointerEvents="none"
    >
      <Tree x={18} size={58} delay={0} />
      <Tree x={66} size={38} delay={600} />
    </View>
  );
}