import React from 'react'
import Constants from 'expo-constants'
import { StyleSheet, View, ScrollView } from 'react-native'

import colors from '../../config/colors'

function Container({ children, style, viewStyle }) {
  return (
    <ScrollView contentContainerStyle={[styles.container, style]}>
      <View style={[styles.view, viewStyle]}>{children}</View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },
  view: {
    flex: 1,
    backgroundColor: colors.light
  }
})

export default Container
