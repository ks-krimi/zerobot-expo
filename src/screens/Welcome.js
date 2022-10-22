import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView
} from '@gorhom/bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SplashScreen from 'expo-splash-screen'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'

import { Login, Register } from '../components/auth/'
import { Button, Text } from '../components/common'
import Container from '../components/container'
import Zerobot from '../components/rive'
import colors from '../config/colors'
import routes from '../constants/routes'
import { defineAccessToken } from '../features/login'

SplashScreen.preventAutoHideAsync()

const Welcome = ({ navigation }) => {
  const [login, setLogin] = useState(true)
  const [loggedIN, setLoggedIn] = useState(false)
  const [authLoaded, setAuthLoaded] = useState(false)
  const dispatch = useDispatch()

  const bottomSheetRef = useRef(null)

  const snapPoints = useMemo(() => ['40%', '55%'], [])

  useEffect(() => {
    async function prepare() {
      try {
        const token = await AsyncStorage.getItem('token')
        if (token) {
          setLoggedIn(true)
          dispatch(defineAccessToken(JSON.parse(token)))
        } else {
          setLoggedIn(false)
        }
      } catch (error) {
        setLoggedIn(false)
      } finally {
        setAuthLoaded(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (authLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [authLoaded])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Container
          onLayout={onLayoutRootView}
          style={styles.container}
          viewStyle={styles.view}
        >
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
                <Login
                  bottomSheet={bottomSheetRef.current}
                  setLogin={setLogin}
                  setLoggedIn={setLoggedIn}
                />
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
