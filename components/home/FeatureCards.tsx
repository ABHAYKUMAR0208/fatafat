import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';

type Card = {
  id: string;
  image: any;
  icon: string;
  gradient: [string, string];
  title: string;
  description: string;
  cta: string;
};

const CARDS: Card[] = [
  {
    id: 'vehicles',
    image: require('../../assets/illustrations/all-ride-card.png'),
    icon: 'bicycle-outline',
    gradient: [colors.navy, '#232F5E'],
    title: 'Bike, Auto, Scooty & Car',
    description:
      'Company-fixed fares across every vehicle type — the price you see is the price you pay, with a market-fare comparison shown for transparency.',
    cta: '→ Book now',
  },
  {
    id: 'lady-rider',
    image: require('../../assets/illustrations/pink-rider-card.png'),
    icon: 'female-outline',
    gradient: [colors.navy, '#232F5E'],
    title: 'Lady Rider',
    description:
      'A lady driver option on Cab, or a Pink Scooty ride where both driver and passenger are women — verified, and bookable 7:45 AM–8:00 PM.',
    cta: '→ Request ride',
  },
  {
    id: 'parcel',
    image: require('../../assets/illustrations/parcel-card.png'),
    icon: 'cube-outline',
    gradient: [colors.navy, '#232F5E'],
    title: 'Same-city parcel',
    description:
      'Reliable delivery from door to door. Send documents, gifts or packages within 30 km — with photo evidence, OTP handover and goods protection built in. Same-day pickup and delivery, with real-time tracking and proof of delivery.',
    cta: '→ Send parcel',
  },
  {
    id: 'carpool',
    image: require('../../assets/illustrations/carpool-card.png'),
    icon: 'car-sport-outline',
    gradient: [colors.navy, '#232F5E'],
    title: 'Carpool',
    description:
      "Travelling between cities? Book a seat on a ride someone is already publishing, or publish your own and split the cost with verified co-travellers.",
    cta: '→ Find ride',
  },
];

function FlipCard({ card }: { card: Card }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <Pressable
      style={styles.cardOuter}
      // @ts-ignore - web only pointer events
      onMouseEnter={() => setFlipped(true)}
      // @ts-ignore - web only pointer events
      onMouseLeave={() => setFlipped(false)}
      onHoverIn={() => setFlipped(true)}
      onHoverOut={() => setFlipped(false)}
    >
      <View style={styles.perspective}>
        <View
          style={[
            styles.flipper,
            { transform: [{ rotateY: flipped ? '180deg' : '0deg' }] },
          ]}
        >
          <View style={[styles.face, styles.front]}>
            <Image source={card.image} style={styles.image} resizeMode="cover" />
          </View>

          <View style={[styles.face, styles.back]}>
            <LinearGradient
              colors={card.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.backGradient}
            >
              <View style={styles.iconWrap}>
                <Ionicons name={card.icon as any} size={26} color="#FFFFFF" />
              </View>

              <Text style={styles.title}>{card.title}</Text>
              <Text style={styles.description}>{card.description}</Text>

              <Text style={styles.cta}>{card.cta}</Text>
            </LinearGradient>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default function FeatureCards() {
  return (
    <View style={styles.section}>
      <View style={styles.grid}>
        {CARDS.map((card) => (
          <FlipCard key={card.id} card={card} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: 60,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: colors.paper,
    width: '100%',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    maxWidth: 1200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  cardOuter: {
    flexGrow: 1,
    flexBasis: 240,
    maxWidth: 280,
    aspectRatio: 0.7,
  },
  perspective: {
    flex: 1,
    transform: [{ perspective: 1200 }],
  },
  flipper: {
    flex: 1,
    // @ts-ignore - web only
    transformStyle: 'preserve-3d',
    // @ts-ignore - web only
    transitionProperty: 'transform',
    // @ts-ignore - web only
    transitionDuration: '450ms',
    // @ts-ignore - web only
    transitionTimingFunction: 'ease',
  },
  face: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
    overflow: 'hidden',
    backfaceVisibility: 'hidden',
    // @ts-ignore - web only
    WebkitBackfaceVisibility: 'hidden',
  },
  front: {},
  back: {
    transform: [{ rotateY: '180deg' }],
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backGradient: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-start',
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  title: {
    fontFamily: fonts.displayMedium,
    fontSize: 19,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  description: {
    fontFamily: fonts.body,
    fontSize: 13.5,
    lineHeight: 20,
    color: 'rgba(255,255,255,0.9)',
    flexShrink: 1,
  },
  cta: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 'auto',
  },
});