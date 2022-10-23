import React, { useState, useRef } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'

import Message from '../components/message'
import TempMessage from '../components/message/TempMessage'
import Form from '../components/message/Form'
import colors from '../config/colors'

const Chat = ({ navigation }) => {
  const [showTempMessage, setShowTempMessage] = useState(false)
  const [text, setText] = useState(null)
  const { messages } = useSelector((store) => store.tchat)
  const flatListRef = useRef()

  const handleScrollToEnd = () => {
    flatListRef.current.scrollToEnd()
  }

  const renderItem = ({ item }) => <Message message={item} />

  return (
    <>
      <FlatList
        data={messages}
        ref={flatListRef}
        renderItem={renderItem}
        contentContainerStyle={styles.view}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={handleScrollToEnd}
        keyExtractor={(message) => message.id}
        ListFooterComponent={
          <View style={{ paddingVertical: 4 }}>
            <TempMessage show={showTempMessage} text={text} />
          </View>
        }
      />
      <Form showTemp={setShowTempMessage} setText={setText} />
    </>
  )
}

export default Chat

const styles = StyleSheet.create({
  container: {
    paddingTop: 0
  },
  view: {
    paddingHorizontal: 15,
    backgroundColor: colors.paper
  }
})
