import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';

const BLUE = colors.accentBlue;
const BLUE_ICE = colors.chipBg;
const BLUE_BORDER = 'rgba(51,80,222,0.18)';
const PHOTO_BG = '#EEF3FE';
const PHOTO_BORDER = 'rgba(51,80,222,0.28)';

type PhotoCard = { id: string; title: string; caption: string };

const PHOTO_CARDS: PhotoCard[] = [
  { id: 'boarding', title: 'Passenger boarding', caption: 'Meeting the driver for an intercity trip' },
  { id: 'highway', title: 'On the highway', caption: 'Co-travellers sharing the ride' },
  { id: 'publish', title: 'Driver publishing a ride', caption: 'Setting up a trip from the Driver App' },
];

export default function CarpoolOnTheRoad() {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Ionicons name="car-sport-outline" size={13} color={BLUE} />
          <Text style={styles.badgeLabel}>On The Road</Text>
        </View>
        <Text style={styles.heading}>Real trips, real co-travellers</Text>
        <Text style={styles.lead}>
          Photo placeholders below — sized for your team to drop in licensed photography.
        </Text>
      </View>

      <View style={styles.photoGrid}>
        {PHOTO_CARDS.map((card) => (
          <View key={card.id} style={styles.photoCard}>
            <View style={styles.photoTag}>
              <Text style={styles.photoTagText}>PHOTO</Text>
            </View>
            <View style={styles.photoIconWrap}>
              <Ionicons name="image-outline" size={22} color={BLUE} />
            </View>
            <Text style={styles.photoTitle}>{card.title}</Text>
            <Text style={styles.photoCaption}>{card.caption}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 24, paddingVertical: 48, maxWidth: 1200, width: '100%', alignSelf: 'center' },

  header: { alignItems: 'center', marginBottom: 32 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 8,
    backgroundColor: BLUE_ICE,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: BLUE_BORDER,
  },
  badgeLabel: { fontFamily: fonts.bodyMedium, fontSize: 11.5, letterSpacing: 1, color: BLUE, textTransform: 'uppercase' },

  heading: {
    fontFamily: fonts.display,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.5,
    color: colors.ink,
    textAlign: 'center',
    marginTop: 18,
  },
  lead: { fontFamily: fonts.body, fontSize: 15, lineHeight: 23, color: colors.bodyMutedOnLight, textAlign: 'center', marginTop: 10 },

  photoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 20 },
  photoCard: {
    flexGrow: 1,
    flexBasis: 260,
    maxWidth: 340,
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    backgroundColor: PHOTO_BG,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: PHOTO_BORDER,
  },
  photoTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginBottom: 18,
  },
  photoTagText: { fontFamily: fonts.bodyMedium, fontSize: 10, letterSpacing: 1, color: BLUE },
  photoIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  photoTitle: { fontFamily: fonts.displayMedium, fontSize: 15.5, color: colors.ink, marginBottom: 8, textAlign: 'center' },
  photoCaption: { fontFamily: fonts.body, fontSize: 13, color: colors.bodyMutedOnLight, textAlign: 'center' },
});