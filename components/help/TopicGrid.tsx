import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';

const IS_WEB = Platform.OS === 'web';
const BLUE = colors.accentBlue;

const TOPICS: { id: string; icon: keyof typeof Ionicons.glyphMap; title: string; description: string; count: string }[] = [
  { id: 'bookings', icon: 'calendar-outline', title: 'Bookings & trips', description: 'Cancellations, changing a destination, ride history.', count: '12 articles' },
  { id: 'payments', icon: 'card-outline', title: 'Payments & refunds', description: 'Fare breakdowns, refund timelines, payment methods.', count: '9 articles' },
  { id: 'safety', icon: 'shield-checkmark-outline', title: 'Safety', description: 'SOS, trip sharing, reporting a safety concern.', count: '7 articles' },
  { id: 'account', icon: 'person-circle-outline', title: 'Account', description: 'Login issues, updating details, deleting your account.', count: '6 articles' },
  { id: 'captains', icon: 'car-outline', title: 'Captain support', description: 'Payouts, documents, vehicle changes, ratings.', count: '10 articles' },
  { id: 'parcel', icon: 'cube-outline', title: 'Parcel delivery', description: 'Tracking, proof of delivery, damaged items.', count: '5 articles' },
];

function TopicCard({ item, index }: { item: (typeof TOPICS)[number]; index: number }) {
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
      transition={{ type: 'timing', duration: hovered ? 200 : 450, delay: hovered ? 0 : index * 80 }}
      style={[styles.card, hovered && styles.cardHovered]}
      {...hoverHandlers}
    >
      <View style={[styles.iconWrap, hovered && styles.iconWrapHovered]}>
        <Ionicons name={item.icon} size={20} color={hovered ? '#FFFFFF' : BLUE} />
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.footerRow}>
        <Text style={styles.count}>{item.count}</Text>
        <Ionicons name="arrow-forward" size={14} color={BLUE} />
      </View>
    </MotiView>
  );
}

export default function TopicGrid() {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.heading}>
          Browse by <Text style={styles.headingAccent}>topic.</Text>
        </Text>
      </View>

      <View style={styles.grid}>
        {TOPICS.map((t, i) => (
          <TopicCard key={t.id} item={t} index={i} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 24, paddingVertical: 40, maxWidth: 1200, width: '100%', alignSelf: 'center' },
  header: { alignItems: 'center', marginBottom: 32 },
  heading: { fontFamily: fonts.display, fontSize: 28, lineHeight: 34, letterSpacing: -0.6, color: colors.ink, textAlign: 'center' },
  headingAccent: { color: BLUE },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 18 },
  card: {
    flexGrow: 1,
    flexBasis: 260,
    maxWidth: 300,
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
    width: 42,
    height: 42,
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
  iconWrapHovered: { backgroundColor: BLUE },
  title: { fontFamily: fonts.displayMedium, fontSize: 16, color: colors.ink, marginBottom: 6 },
  description: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 19, color: colors.bodyMutedOnLight, marginBottom: 16 },
  footerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  count: { fontFamily: fonts.bodyMedium, fontSize: 11.5, color: colors.bodyMutedOnLight },
});
