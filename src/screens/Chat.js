import React, { useRef } from 'react'
import { FlatList, StyleSheet } from 'react-native'

import Message from '../components/message'
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
      data={mock}
      ref={flatListRef}
      renderItem={renderItem}
      contentContainerStyle={styles.view}
      onContentSizeChange={handleScrollToEnd}
      keyExtractor={(message) => message.id}
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
