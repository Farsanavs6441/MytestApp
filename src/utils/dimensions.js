import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

// Guideline sizes are based on standard ~5.8" screen mobile device
const GUIDELINE_BASE_WIDTH = 375; // iPhone X width
const GUIDELINE_BASE_HEIGHT = 812; // iPhone X height

// Percentage helpers
export const wp = (percentage) => (SCREEN_WIDTH * percentage) / 100;
export const hp = (percentage) => (SCREEN_HEIGHT * percentage) / 100;

// Scale helpers
export const scale = (size) => (SCREEN_WIDTH / GUIDELINE_BASE_WIDTH) * size;
export const verticalScale = (size) => (SCREEN_HEIGHT / GUIDELINE_BASE_HEIGHT) * size;
export const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;