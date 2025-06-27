#!/bin/bash

echo "Building release APK with bundled JavaScript..."

# Clean previous builds
cd android && ./gradlew clean

# Create the JavaScript bundle
cd ..
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

# Build release APK
cd android
./gradlew assembleRelease

echo "Release APK built successfully!"
echo "APK location: android/app/build/outputs/apk/release/app-release.apk"