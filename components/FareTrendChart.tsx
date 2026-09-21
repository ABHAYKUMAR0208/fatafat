import React from 'react';
import Svg, { Circle, Polyline } from 'react-native-svg';
import { colors } from '../constants/theme';

// Simple decorative line chart used inside the navy fare card — a green dot
// where the trip starts and a pink dot where it ends, with a calm, mostly
// flat line in between to visually back up the "fixed fare" promise.
const POINTS = '4,74 40,60 78,66 116,50 154,58 192,40 230,44 268,14';

export default function FareTrendChart() {
  return (
    <Svg width="100%" height={110} viewBox="0 0 272 90" preserveAspectRatio="none">
      <Polyline
        points={POINTS}
        fill="none"
        stroke={colors.chartLine}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={4} cy={74} r={5} fill={colors.chartStart} />
      <Circle cx={268} cy={14} r={5} fill={colors.chartEnd} />
    </Svg>
  );
}
