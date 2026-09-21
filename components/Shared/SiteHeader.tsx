import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import React, { useState } from 'react';
import { Image, ImageStyle, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { NAV_LINKS } from '../../constants/nav';
import { colors, fonts } from '../../constants/theme';

const logoImg = require('../../assets/logo/fatafat-logo-compact.png');
// Compact logo (mark + wordmark, no tagline) so it stays legible at header height.
const logoImgStyle: ImageStyle = { height: 56, width: 56 * (640 / 348) };

const DESKTOP_BREAKPOINT = 900; // >= this: centered pill nav. below it: hamburger
export const HEADER_HEIGHT = 76;

function Logo() {
    const router = useRouter();
    return (
        <Pressable
            onPress={() => router.push('/')}
            style={(state: any) => [styles.logoWrap, state.hovered && styles.logoWrapHovered]}
        >
            <Image
                source={logoImg}
                style={logoImgStyle}
                resizeMode="contain"
                accessibilityLabel="Fatafat"
            />
        </Pressable>
    );
}

function NavPillItem({
    label,
    href,
    active,
    activeColor,
}: {
    label: string;
    href?: string;
    active?: boolean;
    activeColor?: string;
}) {
    const router = useRouter();
    return (
        <Pressable
            onPress={href ? () => router.push(href as any) : undefined}
            style={(state: any) => [
                styles.navItem,
                (state.hovered || active) && styles.navItemHovered,
                state.pressed && styles.navItemPressed,
            ]}
        >
            {(state: any) => (
                <Text
                    style={[
                        styles.navLabel,
                        (active || state.hovered) && styles.navLabelActive,
                        (active || state.hovered) && activeColor ? { color: activeColor } : null,
                    ]}
                >
                    {label}
                </Text>
            )}
        </Pressable>
    );
}

function CaptainButton() {
    return (
        <Pressable
            style={(state: any) => [
                styles.captainBtn,
                state.hovered && styles.captainBtnHovered,
                state.pressed && styles.captainBtnHovered,
            ]}
        >
            {(state: any) => (
                <Text style={[styles.captainLabel, (state.hovered || state.pressed) && styles.captainLabelHovered]}>
                    Become a captain
                </Text>
            )}
        </Pressable>
    );
}

function DownloadButton() {
    return (
        <Pressable
            style={(state: any) => [
                styles.downloadBtn,
                (state.hovered || state.pressed) && styles.downloadBtnPressed,
            ]}
        >
            {(state: any) => (
                <Text style={[styles.downloadLabel, (state.hovered || state.pressed) && styles.downloadLabelPressed]}>
                    Download app
                </Text>
            )}
        </Pressable>
    );
}

export default function SiteHeader() {
    const { width } = useWindowDimensions();
    const isDesktop = width >= DESKTOP_BREAKPOINT;
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    return (
        <View style={styles.header}>
            <View style={styles.topRow}>
                <Logo />

                {isDesktop && (
                    <View style={styles.navPillOuter} pointerEvents="box-none">
                        <View style={styles.navPill}>
                            {NAV_LINKS.map((link) => (
                                <NavPillItem
                                    key={link.label}
                                    label={link.label}
                                    href={link.href}
                                    active={!!link.href && pathname === link.href}
                                    activeColor={link.href === '/pink-ride' ? colors.magenta : colors.accentBlue}
                                />
                            ))}
                        </View>
                    </View>
                )}

                {isDesktop ? (
                    <View style={styles.actions}>
                        <CaptainButton />
                        <DownloadButton />
                    </View>
                ) : (
                    <Pressable
                        onPress={() => setMenuOpen((open) => !open)}
                        style={({ pressed }) => [styles.menuBtn, pressed && styles.pressed]}
                    >
                        <Ionicons name={menuOpen ? 'close-outline' : 'menu-outline'} size={26} color={colors.navy} />
                    </Pressable>
                )}
            </View>

            {!isDesktop && menuOpen && (
                <View style={styles.mobileMenu}>
                    {NAV_LINKS.map((link) => (
                        <Pressable
                            key={link.label}
                            style={styles.mobileNavItem}
                            onPress={() => {
                                setMenuOpen(false);
                                if (link.href) router.push(link.href as any);
                            }}
                        >
                            <Text
                                style={[
                                    styles.mobileNavLabel,
                                    !!link.href && pathname === link.href && styles.navLabelActive,
                                    !!link.href && pathname === link.href
                                        ? { color: link.href === '/pink-ride' ? colors.magenta : colors.accentBlue }
                                        : null,
                                ]}
                            >
                                {link.label}
                            </Text>
                        </Pressable>
                    ))}

                    <View style={styles.mobileActions}>
                        <CaptainButton />
                        <DownloadButton />
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        // @ts-ignore -- 'fixed' is valid CSS position on web (react-native-web); RN native ignores/falls back
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: HEADER_HEIGHT,
        justifyContent: 'center',
        backgroundColor: colors.paper,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingHorizontal: 24,
    },

    topRow: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 44,
    },
    logoWrap: {
        // @ts-ignore -- web-only, no-op on native
        transitionProperty: 'transform',
        // @ts-ignore -- web-only, no-op on native
        transitionDuration: '220ms',
        // @ts-ignore -- web-only, no-op on native
        transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // slight overshoot, playful
        transform: [{ scale: 1 }],
    },
    logoWrapHovered: {
        transform: [{ scale: 1.06 }],
    },



    navPillOuter: {
    flex: 1,               
    alignItems: 'center',
    justifyContent: 'center',
},
   
    navPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.pillBg,
        borderRadius: 999, 
        paddingHorizontal: 6,
        paddingVertical: 6,
    },
    navItem: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 999,
        // @ts-ignore -- web-only, no-op on native
        transitionDuration: '150ms',
    },
    navItemHovered: {
        backgroundColor: '#FFFFFF',
        transform: [{ scale: 0.94 }], // "zoom out" on hover
    },
    navItemPressed: { opacity: 0.7 },
    navLabel: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.ink },
    navLabelActive: { color: colors.accentBlue, fontFamily: fonts.displayMedium },

    actions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    pressed: { opacity: 0.7 },
    captainBtn: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 999,
        paddingHorizontal: 18,
        paddingVertical: 10,
        // @ts-ignore -- web-only, no-op on native
        transitionProperty: 'background-color, border-color',
        // @ts-ignore -- web-only, no-op on native
        transitionDuration: '150ms',
    },
    captainBtnHovered: {
        backgroundColor: colors.navy,
        borderColor: colors.navy,
    },
    captainLabel: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.navy },
    captainLabelHovered: { color: '#FFFFFF' },
    downloadBtn: {
        backgroundColor: colors.navy,
        borderRadius: 999,
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: colors.navy,
        // @ts-ignore -- web-only, no-op on native
        transitionProperty: 'background-color, border-color',
        // @ts-ignore -- web-only, no-op on native
        transitionDuration: '120ms',
    },
    downloadBtnPressed: {
        backgroundColor: '#FFFFFF',
        borderColor: colors.border,
    },
    downloadLabel: { fontFamily: fonts.bodyMedium, fontSize: 13, color: '#FFFFFF' },
    downloadLabelPressed: { color: colors.navy },

    menuBtn: {
        width: 40,
        height: 40,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mobileMenu: {
  // @ts-ignore -- 'fixed' is valid CSS position on web (react-native-web); RN native ignores/falls back
  position: 'fixed',
  top: HEADER_HEIGHT,
  left: 0,
  right: 0,
  zIndex: 49,
  backgroundColor: colors.paper,
  borderBottomWidth: 1,
  borderBottomColor: colors.border,
  paddingHorizontal: 24,
  paddingVertical: 16,
  gap: 4,
  // @ts-ignore -- web-only drop shadow so the floating menu reads above content
  boxShadow: '0 12px 24px rgba(22, 31, 66, 0.12)',
},
    mobileNavItem: {
        paddingVertical: 12,
    },
    mobileNavLabel: { fontFamily: fonts.bodyMedium, fontSize: 15, color: colors.ink },
    mobileActions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 16 },
});