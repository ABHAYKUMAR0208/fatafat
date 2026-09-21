import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import WhyFatafatHero from '../components/why-fatafat/WhyFatafatHero';
import PromisesGrid from '../components/why-fatafat/PromisesGrid';
import CompareBand from '../components/why-fatafat/CompareBand';
import WhyFatafatStats from '../components/why-fatafat/WhyFatafatStats';
import WhyFatafatFAQ from '../components/why-fatafat/WhyFatafatFAQ';
import SiteHeader, { HEADER_HEIGHT } from '../components/Shared/SiteHeader';
import Footer from '../components/Shared/Footer';
import { colors } from '../constants/theme';

const DESKTOP_BREAKPOINT = 900;

export default function WhyFatafatPage() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= DESKTOP_BREAKPOINT;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <SiteHeader />

        <WhyFatafatHero isDesktop={isDesktop} />
        <PromisesGrid />
        <WhyFatafatStats isDesktop={isDesktop} />
        <CompareBand isDesktop={isDesktop} />
        <WhyFatafatFAQ />

        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  scroll: { paddingTop: HEADER_HEIGHT },
});
