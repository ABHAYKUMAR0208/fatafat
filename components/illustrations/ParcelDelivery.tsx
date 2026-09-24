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

const parcelImg = require('../../assets/illustrations/parcel.png');

export default function ParcelDelivery({ accent = '#EAF0FE' }: { accent?: string }) {
  const bob = useSharedValue(0);
  const rock = useSharedValue(0);

  useEffect(() => {
    bob.value = withRepeat(
      withSequence(
        withTiming(-3, { duration: 950, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 850, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      true
    );
    rock.value = withRepeat(
      withSequence(
        withTiming(0.6, { duration: 950, easing: Easing.inOut(Easing.quad) }),
        withTiming(-0.6, { duration: 850, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      true
    );
  }, [bob, rock]);

  // Tune this bike independently of the car/scooter — no effect on the others.
  const GROUND_OFFSET = -2; // + moves down, - moves up
  const WIDTH = 206;
  const HEIGHT = 170; // bump this (keep WIDTH/HEIGHT roughly proportional) to resize

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateY: bob.value + GROUND_OFFSET },
      { rotate: `${rock.value}deg` },
    ],
  }));

  return (
    <Animated.View style={style}>
      <Image
        source={parcelImg}
        style={{ width: WIDTH, height: HEIGHT }}
        resizeMode="contain"
      />
    </Animated.View>
  );
}