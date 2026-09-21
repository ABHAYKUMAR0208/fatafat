import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors, fonts } from '../../constants/theme';

type IconName = React.ComponentProps<typeof FontAwesome5>['name'];

type Service = {
  id: string;
  image: any;
  icon: IconName;
  title: string;
  description: string;
  ctaLabel: string;
  gradient: [string, string];
};

const SERVICES: Service[] = [
  {
    id: 'pink',
    image: require('../../assets/illustrations/pink-rider-card.png'),
    icon: 'female',
    title: 'Lady Rider',
    description:
      ' A lady driver option on Cab, or a Pink Scooty ride where both driver and passenger are women — verified, and bookable 7:45 AM–8:00 PM.',
    ctaLabel: 'Request ride',
    gradient: [colors.navy, '#232F5E'],
  },

  {
    id: 'ride',
    image: require('../../assets/illustrations/all-ride-card.png'),
    icon: 'motorcycle',
    title: 'Bike, Auto, Scooty & Car',
    description:
      'Company-fixed fares across every vehicle type — the price you see is the price you pay, with a market-fare comparison shown for transparency.',
    ctaLabel: 'Book now',
    gradient: [colors.navy, '#232F5E'],
  },

  {
    id: 'parcel',
    image: require('../../assets/illustrations/parcel-card.png'),
    icon: 'box',
    title: 'Same-city parcel',
    description:
      ' Reliable delivery from door to door. Send documents, gifts or packages within 30 km — with photo evidence, OTP handover and goods protection built in. Same-day pickup and delivery, with real-time tracking and proof of delivery.',
    ctaLabel: 'Send parcel',
    gradient: [colors.navy, '#232F5E'],
  },
  {
    id: 'carpool',
    image: require('../../assets/illustrations/carpool-card.png'),
    icon: 'car-side',
    title: 'Carpool',
    description:
      'Travelling between cities? Book a seat on a ride someone is already publishing, or publish your own and split the cost with verified co-travellers',
    ctaLabel: 'Find ride',
    gradient: [colors.navy, '#232F5E'],
  },
];

const IS_WEB = Platform.OS === 'web';

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [flipped, setFlipped] = useState(false);

  const flipHandlers = IS_WEB
    ? {
        // @ts-ignore - web only pointer events
        onMouseEnter: () => setFlipped(true),
        // @ts-ignore - web only pointer events
        onMouseLeave: () => setFlipped(false),
        onHoverIn: () => setFlipped(true),
        onHoverOut: () => setFlipped(false),
      }
    : {
        onPress: () => setFlipped((f) => !f),
      };

  return (
    <MotiView
      style={styles.cardOuter}
      from={{ opacity: 0, translateY: 40 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 600, delay: 100 + index * 150 }}
    >
      <Pressable style={styles.pressable} {...flipHandlers}>
        <View style={styles.perspective}>
          {IS_WEB ? (
            // WEB: plain View + inline transform + CSS transition.
            // (react-native-reanimated/moti does not reliably drive 3D
            // rotateY transforms inside a browser, so we skip it here.)
            <View
              style={[
                styles.flipper,
                { transform: [{ rotateY: flipped ? '180deg' : '0deg' }] },
              ]}
            >
              <View style={[styles.face, styles.front]}>
                <Image source={service.image} style={styles.image} resizeMode="cover" />
              </View>
              <View style={[styles.face, styles.back]}>
                <CardBack service={service} />
              </View>
            </View>
          ) : (
            // NATIVE (Android/iOS): Reanimated via Moti drives the flip,
            // triggered by tap since touch devices have no hover state.
            <MotiView
              style={styles.flipper}
              animate={{ rotateY: flipped ? '180deg' : '0deg' }}
              transition={{ type: 'timing', duration: 450 }}
            >
              <View style={[styles.face, styles.front]}>
                <Image source={service.image} style={styles.image} resizeMode="cover" />
              </View>
              <View style={[styles.face, styles.back]}>
                <CardBack service={service} />
              </View>
            </MotiView>
          )}
        </View>
      </Pressable>
    </MotiView>
  );
}

function CardBack({ service }: { service: Service }) {
  return (
    <LinearGradient
      colors={service.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.iconWrap}>
        <FontAwesome5 name={service.icon} size={20} color={colors.secondaryBlue} />
      </View>
      <Text style={styles.title}>{service.title}</Text>
      <Text style={styles.description}>{service.description}</Text>

      <View style={styles.spacer} />

      <View style={styles.ctaRow}>
        <FontAwesome5 name="arrow-right" size={13} color="#FFFFFF" />
        <Text style={styles.ctaLabel}>{service.ctaLabel}</Text>
      </View>
    </LinearGradient>
  );
}

export default function ServicesGrid() {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeLabel}>SERVICES</Text>
        </View>

        <Text style={styles.heading}>
                      One app, Every trip across —
                      <Text style={styles.headingGradientWord}> and beyond the city </Text>
                    </Text>

        <Text style={styles.subheading}>
          Choose a ride type, send a parcel, or book a seat on an intercity carpool — all from the same app.
        </Text>
      </View>

      <View style={styles.grid}>
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingTop: 48,
  },
  header: {
    paddingHorizontal: 24,
    maxWidth: 640,
    alignSelf: 'center',
    alignItems: 'center',
  },
  badge: {
    alignSelf: 'center',
    backgroundColor: colors.chipBg,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginBottom: 20,
  },
  badgeLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    letterSpacing: 0.5,
    color: colors.accentBlue,
  },
  heading: {
    fontFamily: fonts.display,
    fontSize: 32,
    lineHeight: 40,
    color: colors.ink,
    marginBottom: 14,
    textAlign: 'center',
  },
  headingGradientWord: {
    fontFamily: fonts.display,
    fontSize: 32,
    lineHeight: 40,
    color: colors.accentBlue,
  },
  subheading: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 23,
    color: colors.bodyMutedOnLight,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    paddingHorizontal: 24,
    paddingVertical: 40,
    alignItems: 'stretch',
  },
  cardOuter: {
    flexGrow: 1,
    flexBasis: 260,
    maxWidth: 320,
    aspectRatio: 3 / 4, 
  },
  pressable: {
    flex: 1,
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
  card: {
    flex: 1,
    borderRadius: 20,
    padding: 28,
    minHeight: 220,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(30,155,224,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(30,155,224,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 19,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  description: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: 'rgba(255,255,255,0.9)',
  },
  spacer: {
    flexGrow: 1,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 24,
    opacity: 0.9,
  },
  ctaLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: '#FFFFFF',
  },
});