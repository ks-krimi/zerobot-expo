import { Formik } from 'formik'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import colors from '../../config/colors'
import { validateRegister } from '../../helpers'
import { Button, Input } from '../common'

const Register = ({ setLogin }) => {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validate={validateRegister}
        onSubmit={(values, helpers) => {
          console.log(values)
          helpers.resetForm()
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, isValid, values }) => (
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
              disabled={!isValid}
              onPress={handleSubmit}
              title="S'inscrire"
              style={{ padding: 8 }}
            />
          </View>
        )}
      </Formik>
      <TouchableOpacity onPress={() => setLogin(true)}>
        <Text style={{ color: colors.dark }}>
          J'ai déja un compte, se connecter.
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
  }
})
