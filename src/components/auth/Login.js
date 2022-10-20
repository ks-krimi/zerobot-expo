import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import colors from '../../config/colors'
import { Button, Input } from '../common'

const Login = ({ setLogin, setLoggedIn }) => {
  return (
    <View style={styles.container}>
      <Input icon="email" placeholder="Enter votre email" />
      <Input icon="key-chain-variant" placeholder="Enter votre mot de passe" />
      <Button
        onPress={() => {
          setLoggedIn(true)
        }}
        title="Se connecter"
        style={{ padding: 8 }}
      />

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
