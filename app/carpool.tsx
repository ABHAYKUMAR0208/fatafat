import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import CarpoolHero from '../components/carpool/CarpoolHero';
import CarpoolStats from '../components/carpool/CarpoolStats';
import CarpoolHowItWorks from '../components/carpool/CarpoolHowItWorks';
import CarpoolPricing from '../components/carpool/CarpoolPricing';
import CarpoolSafety from '../components/carpool/CarpoolSafety';
import CarpoolRequirements from '../components/carpool/CarpoolRequirements';
import CarpoolFAQ from '../components/carpool/CarpoolFAQ';
import CarpoolOnTheRoad from '../components/carpool/CarpoolOnTheRoad';
import CarpoolCTA from '../components/carpool/CarpoolCTA';
import SiteHeader, { HEADER_HEIGHT } from '../components/Shared/SiteHeader';
import Footer from '../components/Shared/Footer';
import { colors } from '../constants/theme';

const DESKTOP_BREAKPOINT = 900;

export default function CarpoolPage() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= DESKTOP_BREAKPOINT;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <SiteHeader />

        <CarpoolHero isDesktop={isDesktop} />
        <CarpoolStats isDesktop={isDesktop} />
        <CarpoolHowItWorks isDesktop={isDesktop} />
        <CarpoolPricing isDesktop={isDesktop} />
        <CarpoolSafety />
        <CarpoolRequirements />
        <CarpoolFAQ />
        <CarpoolOnTheRoad />
        {/* <CarpoolCTA /> */}

        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  scroll: { paddingTop: HEADER_HEIGHT },
});