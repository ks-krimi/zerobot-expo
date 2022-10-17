import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'

import Welcome from './src/screens/Welcome'

export default function App() {
  return (
    <View style={styles.container}>
      <Welcome />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
