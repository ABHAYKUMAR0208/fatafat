import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors, fonts } from '../../constants/theme';

const IS_WEB = Platform.OS === 'web';

/** The real four-colour Play Store triangle mark (not a generic glyph). */
function PlayStoreIcon({ size = 22 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92z" fill="#4285F4" />
      <Path d="M16.982 10.17l-3.19-1.842L5.386 12l8.406 3.672 3.19-1.842a.999.999 0 000-1.738v-.002z" fill="#34A853" />
      <Path d="M5.386 2L13.792 6.17l-3.19 1.842-5.216-5.01A1.003 1.003 0 015.386 2z" fill="#FBBC04" />
      <Path d="M5.386 22l5.216-5.01 3.19 1.842L5.386 22z" fill="#EA4335" />
    </Svg>
  );
}

function StoreButton({
  variant,
  caption,
  title,
  index,
}: {
  variant: 'play' | 'apple';
  caption: string;
  title: string;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  const hoverHandlers = IS_WEB
    ? {
        // @ts-ignore - web only pointer events
        onMouseEnter: () => setHovered(true),
        // @ts-ignore - web only pointer events
        onMouseLeave: () => setHovered(false),
      }
    : {};

  return (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{
        opacity: 1,
        translateY: hovered ? -3 : 0,
      }}
      transition={{ type: 'timing', duration: hovered ? 200 : 450, delay: hovered ? 0 : index * 100 }}
    >
      <Pressable
        style={({ pressed }) => [styles.btn, hovered && styles.btnHovered, pressed && styles.pressed]}
        {...hoverHandlers}
      >
        <View style={styles.iconWrap}>
          {variant === 'play' ? (
            <PlayStoreIcon size={22} />
          ) : (
            <Ionicons name="logo-apple" size={24} color="#FFFFFF" />
          )}
        </View>
        <View>
          <Text style={styles.caption}>{caption}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </MotiView>
  );
}

export default function StoreButtons() {
  return (
    <View style={styles.row}>
      <StoreButton variant="play" caption="GET IT ON" title="Google Play" index={0} />
      <StoreButton variant="apple" caption="Download on the" title="App Store" index={1} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 24 },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.navy,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 18,
    // @ts-ignore - web only
    transitionProperty: 'background-color, border-color, box-shadow',
    // @ts-ignore - web only
    transitionDuration: '200ms',
  },
  btnHovered: {
    backgroundColor: '#212C55',
    borderColor: 'rgba(255,255,255,0.2)',
    // @ts-ignore - web only
    boxShadow: '0 12px 28px -8px rgba(51,80,222,0.4)',
  },
  iconWrap: {
    width: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caption: {
    fontFamily: fonts.body,
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  title: { fontFamily: fonts.displayMedium, fontSize: 15, color: '#FFFFFF', marginTop: 1 },
});