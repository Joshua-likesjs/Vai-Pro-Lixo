export const Colors = {
  bg: '#F0DC7A',
  bgLight: '#F5E490',
  dark: '#1A3C34',
  dark2: '#234D42',
  gold: '#C8960A',
  goldLight: '#D4A520',
  goldBtn: '#C89A15',
  cardBg: '#E8D065',
  cardBgActive: '#1A3C34',
  white: '#FFFFFF',
  textDark: '#1A3C34',
  textMuted: '#3A6055',
  textLight: '#FFFFFF',
  textLightMuted: 'rgba(255,255,255,0.65)',
  border: 'rgba(26,60,52,0.15)',
  navBg: '#1A3C34',
};

export const Fonts = {
  regular: 'Nunito_400Regular' as const,
  semiBold: 'Nunito_600SemiBold' as const,
  bold: 'Nunito_700Bold' as const,
  extraBold: 'Nunito_800ExtraBold' as const,
  black: 'Nunito_900Black' as const,
};

export const Radius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  full: 999,
};

export const Shadow = {
  card: {
    shadowColor: '#1A3C34',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  btn: {
    shadowColor: '#C8960A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
};
