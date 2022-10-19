import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

import colors from '../../../config/colors'
import defaultStyles from '../../../config/styles'

function AppTextInput({
  icon,
  iconType = 'MaterialCommunityIcons',
  width = '100%',
  ...otherProps
}) {
  return (
    <View style={[styles.container, { width }]}>
      {icon && iconType === 'MaterialIcons' && (
        <MaterialIcons
          name={icon}
          size={24}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      )}
      {icon && iconType === 'MaterialCommunityIcons' && (
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={defaultStyles.colors.medium}
        style={[defaultStyles.text, styles.input]}
        {...otherProps}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.grey,
    borderRadius: 25,
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginVertical: 8,
    alignItems: 'center'
  },
  icon: {
    marginRight: 10
  },
  input: {
    width: '100%',
    fontSize: 14,
    color: colors.dark
  }
})

export default AppTextInput
