import Constants from 'expo-constants'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'

import colors from '../../config/colors'
import { Modal } from '../common/'

function Container({ children, style, viewStyle }) {
  const { success: successRegister, error: errorRegister } = useSelector(
    (store) => store.register
  )
  const { success: successLogin, error } = useSelector((store) => store.login)

  return (
    <ScrollView contentContainerStyle={[styles.container, style]}>
      <View style={[styles.view, viewStyle]}>
        {children}
        <Modal
          type={successRegister || successLogin ? 'congratulation' : 'error'}
          modalVisible={
            successRegister ||
            successLogin ||
            error.status ||
            errorRegister.status
          }
          message={error.message || errorRegister.message}
        />
      </View>
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
    backgroundColor: colors.paper
  }
})

export default Container
