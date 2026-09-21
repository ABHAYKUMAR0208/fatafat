import React, { useEffect } from 'react';
import { Image } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const cabImg = require('../../assets/illustrations/cab.png');

export default function CarpoolScene({ accent = '#3350DE' }: { accent?: string }) {
  const bob = useSharedValue(0);

  useEffect(() => {
    bob.value = withRepeat(
      withSequence(
        withTiming(-3, { duration: 950, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 850, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      true
    );
  }, [bob]);

  // Tune this car independently of the bike/scooter — no effect on the others.
  const GROUND_OFFSET = 25; // + moves down, - moves up
  const WIDTH = 350;
  const HEIGHT = 190; // bump this (keep WIDTH/HEIGHT roughly proportional) to resize

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: bob.value + GROUND_OFFSET }],
  }));

  return (
    <Animated.View style={style}>
      <Image source={cabImg} style={{ width: WIDTH, height: HEIGHT }} resizeMode="contain" />
    </Animated.View>
  );
}