import { Formik } from 'formik'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import colors from '../../config/colors'
import { login } from '../../features/login'
import { validateLogin } from '../../helpers'
import { Button, Input } from '../common'

const Login = ({ bottomSheet, setLogin, setLoggedIn }) => {
  const dispatch = useDispatch()
  const { error } = useSelector((store) => store.login)

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: '', password: '' }}
        validate={validateLogin}
        onSubmit={(values, helpers) => {
          dispatch(
            login({
              credentials: values,
              onSuccess: { bottomSheet, setLoggedIn, helpers }
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
              icon="email"
              placeholder="Enter votre email"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
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
              title="Se connecter"
              style={{ padding: 8 }}
            />
            {!!error?.status && (
              <Text style={{ color: colors.dark }}>{error.message}</Text>
            )}
          </View>
        )}
      </Formik>

      <TouchableOpacity onPress={() => setLogin(false)}>
        <Text style={{ color: colors.dark }}>
          J'ai pas un compte, s'inscrire.
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1
  }
})
