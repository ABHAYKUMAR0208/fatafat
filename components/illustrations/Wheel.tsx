import React, { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Line } from 'react-native-svg';

type Props = {
  size?: number;
  rimColor?: string;
  hubColor?: string;
};

export default function Wheel({ size = 30, rimColor = '#1B1035', hubColor = '#EAF0FE' }: Props) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 900, easing: Easing.linear }), -1, false);
  }, [rotation]);

  const style = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const r = size / 2;

  return (
    <Animated.View style={[{ width: size, height: size }, style]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle cx={r} cy={r} r={r - 2} fill={rimColor} />
        <Circle cx={r} cy={r} r={r / 3} fill={hubColor} />
        <Line x1={r} y1={2} x2={r} y2={size - 2} stroke={hubColor} strokeWidth={2} />
        <Line x1={2} y1={r} x2={size - 2} y2={r} stroke={hubColor} strokeWidth={2} />
      </Svg>
    </Animated.View>
  );
}
