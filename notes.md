- How to make APK?

- Step 1: Install EAS CLI (one time)
 npm install -g eas-cli
 -  check version
 eas --version

 - step 2  Login to Expo
 - npx expo login

 - Step 3: Configure EAS in your project
  npx expo prebuild
  npx eas build:configure

  - Step 4: Update app.json (IMPORTANT)



 - Step 5: Build APK
 - npx eas build -p android --profile preview


 # package 
  * npm install formik
  * npm install @react-native-picker/picker
   * npm install @react-native-community/datetimepicker