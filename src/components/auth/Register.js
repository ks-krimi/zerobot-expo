import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import colors from '../../config/colors'
import { Button, Input } from '../common'

const Register = ({ setLogin }) => {
  return (
    <View style={styles.container}>
      <Input icon="account" placeholder="Enter votre pseudo" />
      <Input icon="email" placeholder="Enter votre email" />
      <Input icon="key-chain-variant" placeholder="Enter votre mot de passe" />
      <Button onPress={() => {}} title="S'inscrire" style={{ padding: 8 }} />

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
