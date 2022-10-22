import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import colors from '../../../config/colors'

function AppButton({
  title,
  onPress,
  disabled,
  style,
  color = 'primary',
  ...otherProps
}) {
  const getBg = () => (disabled ? colors.disabled : colors[color])

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.button, { backgroundColor: getBg() }, style]}
      onPress={onPress}
      {...otherProps}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: '100%',
    marginVertical: 10
  },
  text: {
    color: colors.white,
    fontSize: 18,
    // textTransform: 'uppercase',
    fontWeight: 'bold'
  }
})

export default AppButton
