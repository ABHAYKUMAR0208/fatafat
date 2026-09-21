import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import HelpHero from '../components/help/HelpHero';
import TopicGrid from '../components/help/TopicGrid';
import ContactSection from '../components/help/ContactSection';
import HelpFAQ from '../components/help/HelpFAQ';
import SiteHeader, { HEADER_HEIGHT } from '../components/Shared/SiteHeader';
import Footer from '../components/Shared/Footer';
import { colors } from '../constants/theme';

const DESKTOP_BREAKPOINT = 900;

export default function HelpPage() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= DESKTOP_BREAKPOINT;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <SiteHeader />

        <HelpHero isDesktop={isDesktop} />
        <TopicGrid />
        <ContactSection />
        <HelpFAQ />

        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  scroll: { paddingTop: HEADER_HEIGHT },
});