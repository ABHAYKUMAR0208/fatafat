import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fonts } from '../../constants/theme';

const ACCENT_BLUE = '#3350DE';

type Feature = { icon: React.ComponentProps<typeof Ionicons>['name']; label: string };

const DEFAULT_FEATURES: Feature[] = [
  { icon: 'checkmark-circle-outline', label: 'Fixed fare promise' },
  { icon: 'shield-checkmark-outline', label: 'Background-verified captains' },
  { icon: 'cube-outline', label: 'Parcels in 30 minutes' },
];

export default function FeatureBullets({ items = DEFAULT_FEATURES }: { items?: Feature[] }) {
  return (
    <View style={styles.wrap}>
      {items.map((f) => (
        <View key={f.label} style={styles.item}>
          <Ionicons name={f.icon} size={18} color={ACCENT_BLUE} />
          <Text style={styles.label}>{f.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 20, gap: 20 },
  item: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  label: { fontFamily: fonts.body, fontSize: 13, color: '#5B6472' },
});