import React, { useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { colors, fonts } from '../constants/theme';
import FareTrendChart from './FareTrendChart';

const RIDE_TYPES = ['Bike', 'Auto', 'Car', 'Parcel'] as const;
type RideType = (typeof RIDE_TYPES)[number];

export default function BookingPanel() {
  const [pinkRide, setPinkRide] = useState(true);
  const [selected, setSelected] = useState<RideType>('Auto');

  return (
    <View>
      {/* Navy fare card */}
      <View style={styles.fareCard}>
        <FareTrendChart />
      </View>

      {/* Pink Ride toggle */}
      <View style={styles.row}>
        <Text style={styles.rowLabel}>Pink Ride — women captains</Text>
        <Switch
          value={pinkRide}
          onValueChange={setPinkRide}
          trackColor={{ false: '#D8D8E2', true: colors.accentBlue }}
          thumbColor="#FFFFFF"
        />
      </View>

      {/* Where to? search */}
      <View style={styles.searchField}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          placeholder="Where to?"
          placeholderTextColor={colors.bodyMutedOnLight}
          style={styles.searchInput}
        />
      </View>

      {/* Ride type pills */}
      <View style={styles.pillRow}>
        {RIDE_TYPES.map((type) => {
          const active = type === selected;
          return (
            <Pressable
              key={type}
              onPress={() => setSelected(type)}
              style={[styles.pill, active && styles.pillActive]}
            >
              <Text style={[styles.pillLabel, active && styles.pillLabelActive]}>{type}</Text>
            </Pressable>
          );
        })}
      </View>

      {/* Fare Promise banner */}
      <View style={styles.promiseCard}>
        <Text style={styles.promiseTitle}>Fare Promise</Text>
        <Text style={styles.promiseBody}>You pay the fixed fare shown — always.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fareCard: {
    backgroundColor: colors.navy,
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  rowLabel: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.ink },
  searchField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.fieldBg,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  searchIcon: { fontSize: 16, color: colors.bodyMutedOnLight, marginRight: 8 },
  searchInput: { flex: 1, fontFamily: fonts.body, fontSize: 14, color: colors.ink, padding: 0 },
  pillRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  pill: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: colors.pillBg,
  },
  pillActive: { backgroundColor: colors.pillActive },
  pillLabel: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.ink },
  pillLabelActive: { color: '#FFFFFF' },
  promiseCard: {
    backgroundColor: colors.lavender,
    borderRadius: 14,
    padding: 16,
    marginTop: 14,
  },
  promiseTitle: { fontFamily: fonts.displayMedium, fontSize: 14, color: colors.navy, marginBottom: 4 },
  promiseBody: { fontFamily: fonts.body, fontSize: 13, lineHeight: 18, color: colors.bodyMutedOnLight },
});
