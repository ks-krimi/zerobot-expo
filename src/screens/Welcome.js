import React from 'react'
import { StyleSheet } from 'react-native'

import { Button } from '../components/common'
import Container from '../components/container'
import Zerobot from '../components/rive'
import routes from '../constants/routes'

const Welcome = ({ navigation }) => {
  return (
    <Container style={styles.container} viewStyle={styles.view}>
      <Zerobot />
      <Button
        onPress={() => {
          navigation.navigate(routes.CHAT)
        }}
        title="Commencer"
        style={{ width: 250 }}
      />
    </Container>
  )
}

export default Welcome

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    backgroundColor: 'red'
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})
