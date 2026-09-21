import { MotiView } from 'moti';
import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';

const IS_WEB = Platform.OS === 'web';

type CityStatus = 'live' | 'soon' | 'planned';

type City = { id: string; city: string; status: CityStatus; emoji: string; detail: string };

const CITIES: City[] = [
  { id: 'delhi-ncr', city: 'Delhi NCR', status: 'live', emoji: '📍', detail: 'Full operations across Delhi, Gurgaon, Noida & Faridabad' },
  { id: 'mumbai', city: 'Mumbai', status: 'soon', emoji: '🏙️', detail: 'Launching soon across the Mumbai metropolitan region' },
  { id: 'bengaluru', city: 'Bengaluru', status: 'soon', emoji: '🌴', detail: "Coming next to India's Silicon Valley" },
  { id: 'pune', city: 'Pune', status: 'soon', emoji: '⛰️', detail: 'Ride-hailing services arriving soon in Pune' },
  { id: 'hyderabad', city: 'Hyderabad', status: 'planned', emoji: '🕌', detail: 'On the roadmap for a future phase of expansion' },
  { id: 'chennai', city: 'Chennai', status: 'planned', emoji: '🌊', detail: 'On the roadmap for a future phase of expansion' },
];

const STATUS_META: Record<CityStatus, { label: string; bg: string; text: string; dot?: string }> = {
  live: { label: 'Live', bg: 'rgba(16,185,129,0.12)', text: '#10B981', dot: '#10B981' },
  soon: { label: 'Coming Soon', bg: 'rgba(51,80,222,0.1)', text: colors.accentBlue },
  planned: { label: 'On the Roadmap', bg: 'rgba(100,116,139,0.1)', text: '#94A3B8' },
};

function CityCard({ item, index }: { item: City; index: number }) {
  const [hovered, setHovered] = useState(false);
  const meta = STATUS_META[item.status];
  const isLive = item.status === 'live';

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
      style={[styles.card, isLive && styles.cardActive, hovered && styles.cardHovered]}
      from={{ opacity: 0, translateY: 24 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 500, delay: index * 90 }}
      {...hoverHandlers}
    >
      <View style={styles.cardIconWrap}>
        <Text style={styles.cardIcon}>{item.emoji}</Text>
      </View>

      <View style={styles.cardTop}>
        <Text style={styles.cityName}>{item.city}</Text>
        <View style={[styles.statusBadge, { backgroundColor: meta.bg }]}>
          {meta.dot ? <View style={[styles.liveDot, { backgroundColor: meta.dot }]} /> : null}
          <Text style={[styles.statusText, { color: meta.text }]}>{meta.label}</Text>
        </View>
      </View>

      <Text style={styles.cardDetail}>{item.detail}</Text>
    </MotiView>
  );
}

export default function CityGrid() {
  return (
    <View style={styles.section}>
      <View style={styles.grid}>
        {CITIES.map((c, i) => (
          <CityCard key={c.id} item={c} index={i} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 24, paddingVertical: 24, maxWidth: 1200, width: '100%', alignSelf: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 20, justifyContent: 'center' },
  card: {
    flexGrow: 1,
    flexBasis: 250,
    maxWidth: 280,
    borderRadius: 20,
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(15,23,42,0.06)',
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
    // @ts-ignore - web only
    transitionProperty: 'transform, box-shadow, border-color',
    // @ts-ignore - web only
    transitionDuration: '250ms',
  },
  cardHovered: {
    transform: [{ translateY: -4 }],
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 14 },
  },
  cardActive: { borderColor: '#10B981', backgroundColor: 'rgba(16,185,129,0.03)' },
  cardIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.chipBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardIcon: { fontSize: 20 },
  cardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, flexWrap: 'wrap', gap: 8 },
  cityName: { fontFamily: fonts.displayMedium, fontSize: 18, color: colors.ink },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  statusText: { fontFamily: fonts.bodyMedium, fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 },
  liveDot: { width: 6, height: 6, borderRadius: 3 },
  cardDetail: { fontFamily: fonts.body, fontSize: 13, lineHeight: 20, color: colors.bodyMutedOnLight },
});
