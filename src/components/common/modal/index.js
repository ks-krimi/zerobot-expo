import LottieView from 'lottie-react-native'
import React from 'react'
import { Modal, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import colors from '../../../config/colors'
import {
  reinitilize as reinitilizeLoginSuccess,
  removeError as removeLoginErr
} from '../../../features/login'
import {
  reinitilize as reinitilizeRegisterSuccess,
  removeError as removeRegisterErr
} from '../../../features/register'
import Text from '../text'

const AppModal = ({
  modalVisible,
  message = null,
  type = 'congratulation' || 'error' || 'success'
}) => {
  const { success: successRegister, error: errorRegister } = useSelector(
    (store) => store.register
  )
  const { success: successLogin, error: errorLogin } = useSelector(
    (store) => store.login
  )

  const dispatch = useDispatch()

  const removeError = () => {
    if (errorLogin.status) {
      dispatch(removeLoginErr())
    }
    if (errorRegister.status) {
      dispatch(removeRegisterErr())
    }
    if (successLogin) {
      dispatch(reinitilizeLoginSuccess())
    }
    if (successRegister) {
      dispatch(reinitilizeRegisterSuccess())
    }
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={removeError}
    >
      <View style={styles.centeredView}>
        <LottieView
          autoPlay
          loop={false}
          style={
            type === 'error'
              ? styles.error
              : type === 'success'
              ? styles.success
              : styles.congratulation
          }
          onAnimationFinish={removeError}
          source={
            type === 'error'
              ? require('../../../../assets/errors.json')
              : type === 'success'
              ? require('../../../../assets/success.json')
              : require('../../../../assets/congratulation.json')
          }
        />
        {type === 'error' && <Text style={styles.text}>{message}</Text>}
      </View>
    </Modal>
  )
}

export default AppModal

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    color: colors.dark,
    paddingVertical: 8
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0cc'
  },
  error: {
    width: 150,
    height: 150
  },
  success: {
    width: 200,
    height: 200
  },
  congratulation: {
    width: 350,
    height: 350
  }
})
