import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import CitiesHero from '../components/cities/CitiesHero';
import CityGrid from '../components/cities/CityGrid';
import ExpansionTimeline from '../components/cities/ExpansionTimeline';
import CitiesFAQ from '../components/cities/CitiesFAQ';
import SiteHeader, { HEADER_HEIGHT } from '../components/Shared/SiteHeader';
import Footer from '../components/Shared/Footer';
import { colors } from '../constants/theme';

const DESKTOP_BREAKPOINT = 900;

export default function CitiesPage() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= DESKTOP_BREAKPOINT;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <SiteHeader />

        <CitiesHero isDesktop={isDesktop} />
        <CityGrid />
        <ExpansionTimeline />
        <CitiesFAQ />

        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  scroll: { paddingTop: HEADER_HEIGHT },
});