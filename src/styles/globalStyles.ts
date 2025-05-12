import { StyleSheet } from 'react-native';

export const getGlassmorphism = (isDarkMode: boolean) => {
  const { colors } = getColors(isDarkMode);
  return StyleSheet.create({
    container: {
      backgroundColor: isDarkMode ? 'rgba(57, 62, 70, 0.2)' : 'rgba(223, 208, 184, 0.2)',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: isDarkMode ? 'rgba(57, 62, 70, 0.3)' : 'rgba(223, 208, 184, 0.3)',
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      padding: 20,
      margin: 10,
      overflow: 'hidden',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: isDarkMode ? 'rgba(34, 40, 49, 0.1)' : 'rgba(255, 255, 255, 0.1)',
    },
    text: {
      color: colors.text,
      textShadowColor: 'rgba(0, 0, 0, 0.1)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
  });
};

interface ColorPalette {
  primary: string;
  accent: string;
  background: string;
  text: string;
  secondaryText: string;
  danger: string;
  success: string;
  warning: string;
}

export const colors = {
  dark: {
    primary: '#393E46',
    accent: '#DFD0B8',
    background: '#222831',
    text: '#DFD0B8',
    secondaryText: '#948979',
    danger: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
  },
  light: {
    primary: '#DFD0B8',
    accent: '#393E46',
    background: '#FFFFFF',
    text: '#222831',
    secondaryText: '#948979',
    danger: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
  }
};

export const getColors = (isDarkMode: boolean): { colors: ColorPalette; isDarkMode: boolean } => {
  return {
    colors: isDarkMode ? colors.dark : colors.light,
    isDarkMode
  };
};