import React, { useRef } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import colors from '../config/colors'
import mock from '../mock'

const Chat = ({ navigation }) => {
  const flatListRef = useRef()

  const handleScrollToEnd = () => {
    flatListRef.current.scrollToEnd()
  }

  return (
    <FlatList
      ref={flatListRef}
      onContentSizeChange={handleScrollToEnd}
      contentContainerStyle={styles.view}
      data={mock}
      keyExtractor={(message) => message.id}
      renderItem={({ item }) => {
        if (item.by !== 'me')
          return (
            <Text key={item.id} style={[styles.message, styles.robot]}>
              {item.content}
            </Text>
          )
        else
          return (
            <Text key={item.id} style={[styles.message, styles.me]}>
              {item.content}
            </Text>
          )
      }}
      ListFooterComponent={<View style={styles.footer} />}
    />
  )
}

export default Chat

const styles = StyleSheet.create({
  container: {
    paddingTop: 0
  },
  view: {
    paddingHorizontal: 15,
    backgroundColor: colors.light
  },
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
  },
  footer: {
    padding: 40
  }
})
