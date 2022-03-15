# TV Maze

This app was developed as a React Native challenge in order to get hired from Jobsity.

All the mandatory and bonus features was implemented (Face ID and Touch will work just on physical devices).

As a plus, some extra features was developed: is possible to add, remove and list favorite people besides series just like was asked to do with series.

As a plus, some unity tests was written with Jest but not all tests because i didn't have too much time.

Some useful libs was used like styled-components and redux.

In android side as asked, the .apk can be found at `~/tvmazeapp-main/android/app/app-release.apk`. 
The project folder will be a little bit big because of this file (34,6 MB).

## Run

1. Dowload the project
2. In terminal, go to project directory with: `cd path/to/project`
3. Run `npm i`

### iOS

1. Run `cd ios && pod install`
2. Run `cd ..`
3. Run `npx react-native run-ios`

### Android

1. With some environment variables configured, see the list of emulators with `emulator -list-avds`
2. Run `emulator -avd <NAME-OF-AVD>`
3. Run `npx react-native run-android`
