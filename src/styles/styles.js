import { StyleSheet } from 'react-native';
import { dimensions, moderateScale, fontSize, verticalScale } from '../utils/responsive';

export const colors = {
  background: '#1a1a1a',
  surface: '#2a2a2a',
  primary: '#cc0000',
  secondary: '#ffd700',
  text: '#ffffff',
  textSecondary: '#cccccc',
  border: '#444444',
  error: '#ff4444',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  section: {
    backgroundColor: colors.surface,
    marginHorizontal: dimensions.paddingLarge,
    marginVertical: dimensions.paddingMedium,
    padding: dimensions.paddingLarge,
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: dimensions.fontLarge,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: dimensions.paddingMedium,
    textAlign: 'center',
  },
  inputRow: {
    marginBottom: dimensions.paddingLarge,
  },
  label: {
    fontSize: dimensions.fontSmall,
    color: colors.textSecondary,
    marginBottom: dimensions.paddingMedium,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: moderateScale(4),
    padding: dimensions.paddingMedium + dimensions.paddingSmall,
    fontSize: dimensions.fontMedium,
    color: colors.text,
    minHeight: dimensions.inputHeight,
  },
  picker: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: moderateScale(4),
    height: dimensions.inputHeight,
    justifyContent: 'center',
  },
  pickerItem: {
    backgroundColor: colors.text,
    color: colors.background,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: verticalScale(14),
    paddingHorizontal: moderateScale(24),
    borderRadius: moderateScale(4),
    alignItems: 'center',
    marginTop: dimensions.paddingMedium,
    minHeight: dimensions.buttonHeight,
  },
  buttonText: {
    color: colors.text,
    fontSize: dimensions.fontMedium,
    fontWeight: 'bold',
  },
  errorText: {
    color: colors.error,
    fontSize: dimensions.fontTiny,
    marginTop: dimensions.paddingSmall,
  },
  // Results specific styles
  resultsContainer: {
    backgroundColor: colors.surface,
    marginHorizontal: dimensions.paddingLarge,
    marginVertical: dimensions.paddingMedium,
    padding: dimensions.paddingXLarge,
    borderRadius: moderateScale(8),
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  resultsTitle: {
    fontSize: fontSize(22),
    fontWeight: 'bold',
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: dimensions.paddingXLarge,
  },
  mainResult: {
    fontSize: dimensions.fontHuge,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: dimensions.paddingXLarge,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: dimensions.paddingMedium,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  resultLabel: {
    fontSize: dimensions.fontSmall,
    color: colors.textSecondary,
  },
  resultValue: {
    fontSize: dimensions.fontSmall,
    color: colors.text,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: colors.surface,
    paddingVertical: dimensions.paddingLarge,
    paddingHorizontal: dimensions.paddingXLarge,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  headerTitle: {
    fontSize: dimensions.fontXLarge,
    fontWeight: 'bold',
    color: colors.secondary,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: dimensions.fontSmall,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: dimensions.paddingSmall,
  },
});