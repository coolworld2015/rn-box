/** @format */

import {AppRegistry , Platform} from 'react-native';
import iOS from './app/src/ios/app/app';
import Android from './app/src/android/app/app';
import {name as appName} from './app.json';

const App = Platform.select({
    ios: () => iOS,
    android: () => Android,
})();

AppRegistry.registerComponent(appName, () => App);
