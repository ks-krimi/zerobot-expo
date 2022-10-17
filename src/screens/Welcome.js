import React from 'react'
import { StyleSheet } from 'react-native'

import { Button } from '../components/common'
import Container from '../components/container'
import Zerobot from '../components/rive'

const Welcome = () => {
  return (
    <Container style={styles.container}>
      <Zerobot />
      <Button title="Commencer" style={{ width: 250 }} />
    </Container>
  )
}

export default Welcome

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    backgroundColor: 'red'
  }
})
