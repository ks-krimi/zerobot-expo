import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'

import AppNavigator from './src/navigations/AppNavigator'
import navigationTheme from './src/navigations/navigationTheme'

export default function App() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar style="auto" />
      <AppNavigator />
    </NavigationContainer>
  )
}
