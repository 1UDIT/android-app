import { registerRootComponent } from 'expo';

import App from './App';
import EnteryPoint from './EnteryPoint';
import {decode, encode} from 'base-64'
import 'react-native-gesture-handler';

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(EnteryPoint);
