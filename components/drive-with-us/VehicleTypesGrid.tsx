import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';

const IS_WEB = Platform.OS === 'web';
const AMBER = colors.accentBlue;

const VEHICLES: { id: string; icon: keyof typeof Ionicons.glyphMap; title: string; description: string }[] = [
  { id: 'auto', icon: 'car-outline', title: 'Auto', description: 'Short-hop city trips, the most requested ride type on Fatafat.' },
  { id: 'bike', icon: 'bicycle-outline', title: 'Bike', description: "Beat traffic on two wheels — quick pickups, lower fuel spend." },
  { id: 'scooty', icon: 'flash-outline', title: 'Scooty', description: 'Light, nimble rides — also powers Pink Ride for lady captains.' },
  { id: 'car', icon: 'car-sport-outline', title: 'Car', description: 'Comfort trips and airport runs at a fixed, upfront fare.' },
  { id: 'parcel', icon: 'cube-outline', title: 'Parcel', description: 'Same-city deliveries you can pick up between passenger trips.' },
];

function VehicleCard({ item, index }: { item: (typeof VEHICLES)[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const hoverHandlers = IS_WEB
    ? {
        // @ts-ignore -- web only pointer events
        onMouseEnter: () => setHovered(true),
        // @ts-ignore -- web only pointer events
        onMouseLeave: () => setHovered(false),
      }
    : {};

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: hovered ? -4 : 0 }}
      transition={{ type: 'timing', duration: hovered ? 200 : 450, delay: hovered ? 0 : index * 90 }}
      style={[styles.card, hovered && styles.cardHovered]}
      {...hoverHandlers}
    >
      <View style={[styles.iconWrap, hovered && styles.iconWrapHovered]}>
        <Ionicons name={item.icon} size={22} color={hovered ? '#FFFFFF' : AMBER} />
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </MotiView>
  );
}

export default function VehicleTypesGrid() {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.heading}>
          Drive what you have. <Text style={styles.headingAccent}>Earn on every trip.</Text>
        </Text>
        <Text style={styles.lead}>One captain account, every vehicle type — switch between them freely.</Text>
      </View>

      <View style={styles.grid}>
        {VEHICLES.map((v, i) => (
          <VehicleCard key={v.id} item={v} index={i} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 24, paddingVertical: 40, maxWidth: 1200, width: '100%', alignSelf: 'center' },
  header: { alignItems: 'center', maxWidth: 620, alignSelf: 'center', marginBottom: 36 },
  heading: {
    fontFamily: fonts.display,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.6,
    color: colors.ink,
    textAlign: 'center',
  },
  headingAccent: { color: AMBER },
  lead: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 24,
    color: colors.bodyMutedOnLight,
    textAlign: 'center',
    marginTop: 12,
  },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 18, justifyContent: 'center' },
  card: {
    flexGrow: 1,
    flexBasis: 190,
    maxWidth: 220,
    borderRadius: 20,
    padding: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(15,23,42,0.06)',
    // @ts-ignore -- web only
    transitionProperty: 'transform, box-shadow',
    // @ts-ignore -- web only
    transitionDuration: '220ms',
  },
  cardHovered: {
    shadowColor: colors.navy,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 3,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: colors.chipBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    // @ts-ignore -- web only
    transitionProperty: 'background-color',
    // @ts-ignore -- web only
    transitionDuration: '220ms',
  },
  iconWrapHovered: { backgroundColor: AMBER },
  title: { fontFamily: fonts.displayMedium, fontSize: 16, color: colors.ink, marginBottom: 6 },
  description: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 19, color: colors.bodyMutedOnLight },
});
