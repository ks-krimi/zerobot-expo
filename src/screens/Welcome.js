import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView
} from '@gorhom/bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SplashScreen from 'expo-splash-screen'
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'

import { Login, Register } from '../components/auth/'
import { Button, Text } from '../components/common'
import Container from '../components/container'
import Zerobot from '../components/rive'
import colors from '../config/colors'
import routes from '../constants/routes'
import { AuthContext } from '../context/auth'
import { defineAccessToken } from '../features/login'
import { getMessages } from '../features/tchat'

SplashScreen.preventAutoHideAsync()

const Welcome = ({ navigation }) => {
  const [login, setLogin] = useState(true)
  const { loggedIN, setLoggedIn } = useContext(AuthContext)
  const [authLoaded, setAuthLoaded] = useState(false)
  const dispatch = useDispatch()

  const bottomSheetRef = useRef(null)

  const snapPoints = useMemo(() => ['40%', '55%'], [])

  useEffect(() => {
    async function prepare() {
      try {
        const token = await AsyncStorage.getItem('token')
        if (token) {
          dispatch(
            getMessages({
              setLoggedIn,
              defineAccessToken: () => {
                dispatch(defineAccessToken(JSON.parse(token)))
              },
              removeAccessToken: () => {
                dispatch(defineAccessToken(null))
              }
            })
          )
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
  }, [loggedIN, setLoggedIn])

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
          {loggedIN && (
            <TouchableOpacity
              onPress={async () => {
                setLoggedIn(false)
                await AsyncStorage.removeItem('token')
              }}
            >
              <Text style={styles.text}> Déconnexion </Text>
            </TouchableOpacity>
          )}
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
                <Register
                  bottomSheet={bottomSheetRef.current}
                  setLogin={setLogin}
                />
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
