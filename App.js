import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { Provider } from 'react-redux'

import { AppNavigator, navigationRef, navigationTheme } from './src/navigations'
import store from './src/store'

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        <StatusBar style="auto" />
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  )
}
