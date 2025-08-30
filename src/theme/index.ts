import colors from './colors';
import typography from './typography';

const theme = {
  colors,
  typography,
  spacing: (factor: number) => factor * 8, 
  borderRadius: {
    sm: 8,
    md: 16,
    lg: 24,
  },
  shadows: {
    light: {
      shadowColor: '#8E44AD',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    medium: {
      shadowColor: '#8E44AD',
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 6,
    },
  },
};

export type Theme = typeof theme;
export default theme;
