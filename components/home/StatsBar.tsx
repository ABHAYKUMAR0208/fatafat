import { MotiView } from 'moti';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';

type Stat = {
  id: string;
  label: string;
  /** Animated count-up target, e.g. 3 or 30. Omit for a non-numeric stat like "NCR". */
  countTo?: number;
  suffix?: string;
  /** Use instead of countTo for stats that aren't a number, e.g. "NCR". */
  staticValue?: string;
};

const STATS: Stat[] = [
  { id: 'ride-types', countTo: 3, label: 'Ride types + parcel' },
  { id: 'cities', staticValue: 'NCR', label: 'Delhi · Gurugram · Noida' },
  { id: 'surge', countTo: 0, suffix: '%', label: 'Surge on base fare' },
  { id: 'delivery', countTo: 30, suffix: ' min', label: 'Typical parcel delivery' },
];

/** Counts up from 0 to `target` with an ease-out curve. Plain RAF so it works on web + native alike. */
function useCountUp(target: number, durationMs = 1100) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf: number;
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  return value;
}

function StatItem({ stat, index, isLast }: { stat: Stat; index: number; isLast: boolean }) {
  const count = useCountUp(stat.countTo ?? 0);
  const display = stat.staticValue ?? `${count}${stat.suffix ?? ''}`;

  return (
    <MotiView
      style={[styles.item, !isLast && styles.itemDivider]}
      from={{ opacity: 0, translateY: 16 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 500, delay: index * 120 }}
    >
      <Text style={styles.value}>{display}</Text>
      <Text style={styles.label}>{stat.label}</Text>
    </MotiView>
  );
}

export default function StatsBar() {
  return (
    <View style={styles.wrap}>
      {STATS.map((stat, i) => (
        <StatItem key={stat.id} stat={stat} index={i} isLast={i === STATS.length - 1} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#F5F7FA',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  item: {
    flexGrow: 1,
    flexBasis: 200,
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  itemDivider: {
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  value: {
    fontFamily: fonts.display,
    fontSize: 32,
    color: colors.accentBlue,
    marginBottom: 6,
  },
  label: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: '#5B6472',
    textAlign: 'center',
  },
});