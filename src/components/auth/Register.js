import { Formik } from 'formik'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'

import colors from '../../config/colors'
import { register } from '../../features/register'
import { validateRegister } from '../../helpers'
import { Button, Input } from '../common'

const Register = ({ bottomSheet, setLogin }) => {
  const dispatch = useDispatch()

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validate={validateRegister}
        onSubmit={(values, helpers) => {
          dispatch(
            register({
              credentials: values,
              onSuccess: { bottomSheet, helpers }
            })
          )
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
          <View>
            <Input
              icon="account"
              placeholder="Enter votre pseudo"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            <Input
              icon="email"
              placeholder="Enter votre email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            <Input
              secureTextEntry={true}
              icon="key-chain-variant"
              placeholder="Enter votre mot de passe"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            <Button
              disabled={!isValid || isSubmitting}
              onPress={handleSubmit}
              title="S'inscrire"
              style={{ padding: 8 }}
            />
          </View>
        )}
      </Formik>
      <TouchableOpacity style={styles.touchable} onPress={() => setLogin(true)}>
        <Text style={styles.text}>J'ai déjà un compte, </Text>
        <Text style={[styles.text, { textDecorationLine: 'underline' }]}>
          se connecter.
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1
  },
  touchable: {
    flexDirection: 'row'
  },
  text: { color: colors.dark }
})
