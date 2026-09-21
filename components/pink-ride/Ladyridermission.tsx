import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';

const riderCardImg = require('../../components/pink-ride/illustrations/Rider-mission.png');
const CARD_IMAGE_ASPECT = 1086 / 1448;

type Point = {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBg: string;
  text: string;
  boldText: string;
};

const POINTS: Point[] = [
  {
    id: 'safety',
    icon: 'shield-checkmark-outline',
    iconColor: colors.magenta,
    iconBg: '#FCE7F3',
    text: 'Give women a transportation option built around ',
    boldText: 'safety, comfort and confidence',
  },
  {
    id: 'earnings',
    icon: 'swap-vertical-outline',
    iconColor: '#8B5CF6',
    iconBg: '#F3E8FF',
    text: 'Create genuine earning opportunities and ',
    boldText: 'financial independence',
  },
  {
    id: 'sustainable',
    icon: 'leaf-outline',
    iconColor: '#10B981',
    iconBg: '#ECFDF5',
    text: 'Support a more ',
    boldText: 'sustainable, eco-friendly',
  },
];

function MissionPoint({ point }: { point: Point }) {
  return (
    <View style={styles.point}>
      <View style={[styles.pointIcon, { backgroundColor: point.iconBg }]}>
        <Ionicons name={point.icon} size={18} color={point.iconColor} />
      </View>
      <Text style={styles.pointText}>
        {point.text}
        <Text style={styles.pointTextBold}>{point.boldText}</Text>
        {point.id === 'sustainable' ? ' way to move around our cities.' : ', every time they travel.'}
        {point.id === 'earnings' ? ' for our Lady Captains.' : ''}
      </Text>
    </View>
  );
}

export default function LadyRiderMission({ isDesktop }: { isDesktop: boolean }) {
  return (
    <View style={[styles.section, !isDesktop && styles.sectionStacked]}>
      <View style={[styles.textCol, !isDesktop && styles.textColStacked]}>
        <Text style={styles.heading}>
          Empowering women,{'\n'}
          <Text style={styles.headingAccent}>one ride at a time</Text>
        </Text>

        <View style={styles.points}>
          {POINTS.map((point) => (
            <MissionPoint key={point.id} point={point} />
          ))}
        </View>
      </View>

      <View style={[styles.visualCol, !isDesktop && styles.visualColStacked]}>
        <LinearGradient
          colors={['#FDF2F8', '#FAE8FF', '#F5F3FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.card}
        >
          <View style={styles.badge}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeLabel}>Lady Captain</Text>
          </View>

          <Image source={riderCardImg} style={styles.cardImage} resizeMode="contain" />

          <View style={styles.rating}>
            <View style={styles.stars}>
              {[0, 1, 2, 3].map((i) => (
                <Ionicons key={i} name="star" size={13} color="#FBBF24" />
              ))}
              <Ionicons name="star" size={13} color="#E5E7EB" />
            </View>
            <Text style={styles.ratingNum}>4.8</Text>
            <Text style={styles.ratingCount}>(2.1k)</Text>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

const CARD_WIDTH = 340;

const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 56,
    paddingHorizontal: 24,
    paddingVertical: 56,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  sectionStacked: {
    flexDirection: 'column-reverse',
    gap: 32,
  },

  textCol: { flex: 1, maxWidth: 560 },
  textColStacked: { width: '100%', maxWidth: '100%' },

  heading: {
    fontFamily: fonts.display,
    fontSize: 40,
    lineHeight: 46,
    letterSpacing: -1,
    color: colors.ink,
    marginBottom: 28,
  },
  headingAccent: { color: colors.magenta },

  points: { gap: 20 },
  point: { flexDirection: 'row', alignItems: 'flex-start', gap: 16 },
  pointIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointText: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 26,
    color: colors.bodyMutedOnLight,
    paddingTop: 4,
  },
  pointTextBold: {
    fontFamily: fonts.bodyMedium,
    color: colors.ink,
  },

  visualCol: { flex: 1, alignItems: 'center' },
  visualColStacked: { width: '100%' },

  card: {
    width: CARD_WIDTH,
    aspectRatio: 340 / 400,
    borderRadius: 32,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    aspectRatio: CARD_IMAGE_ASPECT,
  },

  badge: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 14,
    zIndex: 2,
  },
  badgeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.magenta },
  badgeLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 10.5,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.magenta,
  },

  rating: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
    zIndex: 2,
  },
  stars: { flexDirection: 'row', gap: 1 },
  ratingNum: { fontFamily: fonts.bodyMedium, fontSize: 12, color: colors.ink },
  ratingCount: { fontFamily: fonts.body, fontSize: 10.5, color: '#9CA3AF' },
});