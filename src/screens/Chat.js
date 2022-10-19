import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useRef } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'

import { Input } from '../components/common'
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
    <>
      <FlatList
        data={mock}
        ref={flatListRef}
        renderItem={renderItem}
        contentContainerStyle={styles.view}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={handleScrollToEnd}
        keyExtractor={(message) => message.id}
        ListFooterComponent={<View style={{ paddingVertical: 4 }} />}
      />
      <View style={styles.inputContainer}>
        <Input placeholder="Tapez un message" size={34} width="87%" />
        <TouchableOpacity>
          <MaterialCommunityIcons name="send" style={styles.icon} />
        </TouchableOpacity>
      </View>
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
    backgroundColor: colors.light
  },
  icon: {
    fontSize: 28,
    color: colors.dark
  },
  inputContainer: {
    paddingHorizontal: 15,
    backgroundColor: colors.light,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: 'transparent',
    borderTopWidth: 1
  }
})
