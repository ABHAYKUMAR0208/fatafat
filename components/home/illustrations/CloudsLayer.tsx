import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Ellipse, G } from 'react-native-svg';

const { width } = Dimensions.get('window');

function CloudShape({ scale, opacity }: { scale: number; opacity: number }) {
  return (
    <G opacity={opacity} transform={`scale(${scale})`}>
      <Ellipse cx={0} cy={40} rx={34} ry={16} fill="#FFFFFF" />
      <Ellipse cx={26} cy={32} rx={22} ry={14} fill="#FFFFFF" />
      <Ellipse cx={-26} cy={36} rx={20} ry={12} fill="#FFFFFF" />
    </G>
  );
}

function DriftingCloud({
  top,
  scale,
  opacity,
  duration,
  delay = 0,
}: {
  top: number;
  scale: number;
  opacity: number;
  duration: number;
  delay?: number;
}) {
  const t = useSharedValue(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      t.value = withRepeat(withTiming(1, { duration, easing: Easing.linear }), -1, false);
    }, delay);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(t.value, [0, 1], [width + 60, -140]) }],
  }));

  return (
    <Animated.View style={[{ position: 'absolute', top, left: 0 }, style]} pointerEvents="none">
      <Svg width={140} height={80}>
        <CloudShape scale={scale} opacity={opacity} />
      </Svg>
    </Animated.View>
  );
}

export default function CloudsLayer() {
  return (
    <>
      <DriftingCloud top={4} scale={1} opacity={0.9} duration={16000} />
      <DriftingCloud top={40} scale={0.7} opacity={0.55} duration={22000} delay={4000} />
      <DriftingCloud top={-6} scale={0.5} opacity={0.35} duration={26000} delay={9000} />
    </>
  );
}
