import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView
} from '@gorhom/bottom-sheet'
import React, { useMemo, useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { Login, Register } from '../components/auth/'
import { Button, Text } from '../components/common'
import Container from '../components/container'
import Zerobot from '../components/rive'
import colors from '../config/colors'
import routes from '../constants/routes'

const Welcome = ({ navigation }) => {
  const [login, setLogin] = useState(true)
  const [loggedIN, setLoggedIn] = useState(false)
  const bottomSheetRef = useRef(null)

  const snapPoints = useMemo(() => ['40%', '55%'], [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Container style={styles.container} viewStyle={styles.view}>
          <Zerobot />
          <Button
            onPress={() => {
              if (loggedIN) {
                navigation.navigate(routes.CHAT)
              } else {
                bottomSheetRef.current.present()
              }
            }}
            title={
              loggedIN
                ? 'Démarrer une discussion'
                : 'Veuillez-vous authentifier'
            }
            style={{ width: 250 }}
          />
          <BottomSheetModal
            index={0}
            ref={bottomSheetRef}
            snapPoints={snapPoints}
          >
            <BottomSheetScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.bottomSheetScrollView}
            >
              <Text style={styles.text}>
                {login ? 'Connexion' : 'Inscription'}
              </Text>
              {login ? (
                <Login setLogin={setLogin} setLoggedIn={setLoggedIn} />
              ) : (
                <Register setLogin={setLogin} />
              )}
            </BottomSheetScrollView>
          </BottomSheetModal>
        </Container>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
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
    alignItems: 'center',
    backgroundColor: colors.grey
  },
  bottomSheetScrollView: {
    paddingHorizontal: 18
  },
  text: {
    color: colors.dark,
    paddingVertical: 8
  }
})
