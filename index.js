/**
 * @format
 */
import * as React from 'react';
import 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import { AppProvider } from '@realm/react';
import { REALM_APP_ID } from '@env';
import { RealmProvider } from './context/realmContext';
import { UserProvider } from '@realm/react';
import Auth from './userComponents/Auth';
import { AppContext } from './context/appContext';
import reducer, { initialState } from './context/appReducer';
import SplashScreen from './screens/splashScreen/SplashScreen';
const geoConfig = {
  skipPermissionRequests: false,
  authorizationLevel: 'whenInUse',
};
Geolocation.setRNConfiguration(geoConfig);
export default function Main() {
  const [splash, setSplash] = React.useState(true);
  React.useEffect(() => {
    Geolocation.requestAuthorization();
    setTimeout(() => {
      setSplash(false);
    }, 3000);
  }, []);

  return (
    <AppProvider id={REALM_APP_ID}>
      <UserProvider fallback={Auth}>
        <RealmProvider>
          <AppContext reducer={reducer} initialState={initialState}>
            <NavigationContainer>
              <SafeAreaProvider>
                {splash ? <SplashScreen></SplashScreen> : <App />}
              </SafeAreaProvider>
            </NavigationContainer>
          </AppContext>
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
AppRegistry.registerComponent(appName, () => Main);
