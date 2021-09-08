# Releasing a new Andriod version

- Update the version number in android/app/build.gradle
- Test the version on a simulator
  - `npx react-native run-android --no-jetifier --variant=release`
- Create the Google Play Build
  - `./gradlew bundleRelease`
  - outputs to android/app/build/outputs/bundle/release/app-release.aab
- Create the Amazon App Store Build
  - `./gradlew assembleRelease`
  - outputs to android/app/build/outputs/apk/release/app-release.apk
