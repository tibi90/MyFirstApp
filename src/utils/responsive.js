import { Dimensions, PixelRatio } from 'react-native';

// Get device screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Base dimensions (iPhone 6/7/8 as reference)
const baseWidth = 375;
const baseHeight = 667;

// Scale functions
export const scale = (size) => (screenWidth / baseWidth) * size;
export const verticalScale = (size) => (screenHeight / baseHeight) * size;
export const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

// Font scaling with pixel ratio consideration
export const fontSize = (size) => {
  const newSize = scale(size);
  if (PixelRatio.get() >= 3.5) {
    return newSize - 2;
  }
  return newSize;
};

// Responsive dimensions
export const dimensions = {
  screenWidth,
  screenHeight,
  // Padding and margins
  paddingSmall: moderateScale(4),
  paddingMedium: moderateScale(8),
  paddingLarge: moderateScale(16),
  paddingXLarge: moderateScale(20),
  
  // Component heights
  inputHeight: verticalScale(44),
  inputHeightCompact: verticalScale(36),
  buttonHeight: verticalScale(44),
  
  // Font sizes
  fontTiny: fontSize(12),
  fontSmall: fontSize(14),
  fontMedium: fontSize(16),
  fontLarge: fontSize(20),
  fontXLarge: fontSize(24),
  fontHuge: fontSize(48),
};

// Responsive helpers
export const isSmallDevice = screenWidth < 350;
export const isTablet = screenWidth >= 768;

// Get responsive flex values
export const responsiveFlex = (defaultValue) => {
  if (isTablet) return defaultValue * 1.5;
  if (isSmallDevice) return defaultValue * 0.8;
  return defaultValue;
};