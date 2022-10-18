import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'

import { AppNavigator, navigationTheme } from './src/navigations'

export default function App() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar style="auto" />
      <AppNavigator />
    </NavigationContainer>
  )
}
