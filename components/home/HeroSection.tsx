import { AnimatePresence, MotiView } from 'moti';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { HEADER_HEIGHT } from '../Shared/SiteHeader';
import { heroSlides } from '../../constants/heroSlides';
import { colors, fonts } from '../../constants/theme';
import FeatureBullets from './FeatureBullets';
import HeroCarousel from './HeroCarousel';
import StoreButtons from '../Shared/StoreButtons';

const SLIDE_DURATION = 5000; // must match the pacing feel of HeroCarousel's crossfade

/** Renders slide.body, turning **word** into a bold inline span. */
function RichBody({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <Text style={styles.body}>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <Text key={i} style={styles.bodyBold}>
            {part.slice(2, -2)}
          </Text>
        ) : (
          <Text key={i}>{part}</Text>
        )
      )}
    </Text>
  );
}

export default function HeroSection() {
  const { width, height } = useWindowDimensions();
  const isWide = width >= 960;

  // Single source of truth for "which slide is active" — drives both the
  // carousel on the right AND the copy block on the left, so they can never drift out of sync.
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(id);
  }, []);

  const active = heroSlides[index];

  return (
    <View
      style={[
        styles.wrap,
        isWide && styles.wrapRow,
        isWide && { minHeight: height - HEADER_HEIGHT },
      ]}
    >
      <View style={[styles.copy, isWide && styles.copyWide]}>
        <AnimatePresence exitBeforeEnter>
          <MotiView
            key={active.id}
            from={{ opacity: 0, translateY: 14 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -14 }}
            transition={{ type: 'timing', duration: 450 }}
          >
            <View style={styles.badge}>
              <Text style={styles.badgeLabel}>{active.badgeLabel}</Text>
            </View>

            <Text style={styles.heading}>
              {active.headingLines.map((line, i) => (
                <Text key={i} style={line.accent ? styles.headingAccent : undefined}>
                  {line.text}
                  {i < active.headingLines.length - 1 ? '\n' : ''}
                </Text>
              ))}
            </Text>

            <RichBody text={active.body} />

            <StoreButtons />
            {active.bullets && active.bullets.length > 0 && <FeatureBullets items={active.bullets} />}
          </MotiView>
        </AnimatePresence>
      </View>

      <View style={[styles.videoCol, isWide && styles.videoColWide]}>
        <HeroCarousel activeIndex={index} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 24, paddingVertical: 32, gap: 32 },
  wrapRow: { flexDirection: 'row', alignItems: 'center' },
  copy: {},
  copyWide: { flex: 1, paddingRight: 40 },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.chipBg,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 20,
  },
  badgeLabel: { fontFamily: fonts.bodyMedium, fontSize: 11, letterSpacing: 0.5, color: colors.navy },
  heading: { fontFamily: fonts.display, fontSize: 40, lineHeight: 46, color: colors.ink },
  headingAccent: { color: colors.accentBlue },
  body: { fontFamily: fonts.body, fontSize: 15, lineHeight: 24, color: '#5B6472', marginTop: 20, maxWidth: 460 },
  bodyBold: { fontFamily: fonts.bodyMedium, color: '#3A4250' },
  // Half-width carousel; height follows automatically via HeroCarousel's own aspectRatio
  videoCol: { width: '100%', alignSelf: 'center' },
  videoColWide: { width: '48%', alignSelf: 'center' },
});