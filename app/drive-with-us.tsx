import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import DriveHero from '../components/drive-with-us/DriveHero';
import VehicleTypesGrid from '../components/drive-with-us/VehicleTypesGrid';
import EarningsSection from '../components/drive-with-us/EarningsSection';
import JoinSteps from '../components/drive-with-us/JoinSteps';
import DriveFAQ from '../components/drive-with-us/DriveFAQ';
import SiteHeader, { HEADER_HEIGHT } from '../components/Shared/SiteHeader';
import Footer from '../components/Shared/Footer';
import { colors } from '../constants/theme';

const DESKTOP_BREAKPOINT = 900;

export default function DriveWithUsPage() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= DESKTOP_BREAKPOINT;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <SiteHeader />

        <DriveHero isDesktop={isDesktop} />
        <VehicleTypesGrid />
        <EarningsSection isDesktop={isDesktop} />
        <JoinSteps />
        <DriveFAQ />

        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  scroll: { paddingTop: HEADER_HEIGHT },
});
