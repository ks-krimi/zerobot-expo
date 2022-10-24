import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Formik } from 'formik'
import React, { useContext, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'

import colors from '../../config/colors'
import { AuthContext } from '../../context/auth'
import { sendMessage } from '../../features/tchat'
import { Input } from '../common'

const Form = ({ showTemp, setText }) => {
  const { setLoggedIn } = useContext(AuthContext)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!showTemp) {
      setText(null)
    }
  }, [showTemp])

  return (
    <Formik
      initialValues={{ content: '', by: 'me' }}
      onSubmit={(values, helpers) => {
        setText(values.content)
        helpers.resetForm()
        showTemp(true)
        dispatch(sendMessage({ data: values, setLoggedIn, showTemp }))
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        isValid,
        values,
        isSubmitting
      }) => (
        <View style={styles.inputContainer}>
          <Input
            placeholder="Tapez un message"
            size={34}
            width="87%"
            onChangeText={handleChange('content')}
            onBlur={handleBlur('content')}
            value={values.content}
          />
          <TouchableOpacity
            disabled={!isValid || isSubmitting}
            onPress={handleSubmit}
          >
            <MaterialCommunityIcons name="send" style={styles.icon} />
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  )
}

export default Form

const styles = StyleSheet.create({
  icon: {
    fontSize: 28,
    color: colors.primary
  },
  inputContainer: {
    paddingHorizontal: 15,
    backgroundColor: colors.paper,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: colors.grey,
    borderTopWidth: 1
  }
})
