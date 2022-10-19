import React, { useRef } from 'react'
import { FlatList, StyleSheet } from 'react-native'

import Message from '../components/Message'
import colors from '../config/colors'
import mock from '../mock'

const Chat = ({ navigation }) => {
  const flatListRef = useRef()

  const handleScrollToEnd = () => {
    flatListRef.current.scrollToEnd()
  }

  const renderItem = ({ item }) => <Message message={item} />

  return (
    <FlatList
      ref={flatListRef}
      onContentSizeChange={handleScrollToEnd}
      contentContainerStyle={styles.view}
      data={mock}
      keyExtractor={(message) => message.id}
      renderItem={renderItem}
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
  }
})
