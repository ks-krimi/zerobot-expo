import { Formik } from 'formik'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import colors from '../../config/colors'
import { validateLogin } from '../../helpers'
import { Button, Input } from '../common'

const Login = ({ setLogin, setLoggedIn }) => {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: '', password: '' }}
        validate={validateLogin}
        onSubmit={(values, helpers) => {
          console.log(values)
          setLoggedIn(true)
          helpers.resetForm()
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, isValid, values }) => (
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
              disabled={!isValid}
              onPress={handleSubmit}
              title="Se connecter"
              style={{ padding: 8 }}
            />
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
