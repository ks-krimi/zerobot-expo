import React from 'react'
import { StyleSheet, Text } from 'react-native'

import colors from '../../config/colors'

const TempMessage = ({ show = false, text }) => {
  if (!show) {
    return null
  }
  return (
    <Text key="temporary" style={[styles.message, styles.me]}>
      {text}
    </Text>
  )
}

export default TempMessage

const styles = StyleSheet.create({
  message: {
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 5,
    maxWidth: '70%'
  },
  me: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
    color: colors.white
  }
})
