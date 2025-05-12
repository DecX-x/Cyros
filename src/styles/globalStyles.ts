import { StyleSheet } from 'react-native';

export const glassmorphism = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    padding: 20,
    margin: 10,
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  text: {
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export const colors = {
  primary: '#6366f1',
  accent: '#8b5cf6',
  background: '#0f172a',
  text: '#f8fafc',
  secondaryText: '#94a3b8',
  danger: '#ef4444',
  success: '#10b981',
  warning: '#f59e0b',
};

export const neon = {
  shadow: {
    textShadowColor: colors.accent,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  border: {
    borderColor: colors.accent,
    borderWidth: 1,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
};