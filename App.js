import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'

import { AppNavigator, navigationRef, navigationTheme } from './src/navigations'

export default function App() {
  return (
    <NavigationContainer ref={navigationRef} theme={navigationTheme}>
      <StatusBar style="auto" />
      <AppNavigator />
    </NavigationContainer>
  )
}
