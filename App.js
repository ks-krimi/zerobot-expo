import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'

import AppNavigator from './src/navigations/AppNavigator'

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <AppNavigator />
    </NavigationContainer>
  )
}
