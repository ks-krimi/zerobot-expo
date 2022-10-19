import React from 'react'
import { StyleSheet, Text } from 'react-native'

import colors from '../../config/colors'

const Message = ({ message }) => {
  return message.by !== 'me' ? (
    <Text key={message.id} style={[styles.message, styles.robot]}>
      {message.content}
    </Text>
  ) : (
    <Text key={message.id} style={[styles.message, styles.me]}>
      {message.content}
    </Text>
  )
}

export default Message

const styles = StyleSheet.create({
  message: {
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 5,
    maxWidth: '70%'
  },
  robot: {
    alignSelf: 'flex-start',
    backgroundColor: colors.grey,

    color: colors.dark
  },
  me: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
    color: colors.white
  }
})
