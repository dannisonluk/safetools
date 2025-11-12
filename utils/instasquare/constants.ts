export const APP_NAME = 'InstaSquare';
export const APP_DESCRIPTION = 'Privacy-first Instagram image editor';

export const IMAGE_SIZES = {
  INSTAGRAM: 1080,
  HIGH: 2048,
  '4K': 4096,
  '8K': 8192,
} as const;

export const DEFAULT_COLORS = {
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  DARK_GRAY: '#1a1a1a',
  INSTAGRAM_GRADIENT_START: '#833AB4',
  INSTAGRAM_GRADIENT_MID: '#FD1D1D',
  INSTAGRAM_GRADIENT_END: '#FCB045',
} as const;

export const PRIVACY_FEATURES = [
  'No image uploads',
  'No cloud storage',
  'No AI training',
  'No tracking cookies',
  'No third-party services',
  'Browser-only processing',
] as const;