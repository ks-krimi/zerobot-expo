import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import colors from '../config/colors'
import routes from '../constants/routes'
import { Chat, Welcome } from '../screens'

const StackNavigator = createNativeStackNavigator()

function AppNavigator() {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name={routes.WELCOME}
        component={Welcome}
        options={{ headerShown: false }}
      />
      <StackNavigator.Screen
        name={routes.CHAT}
        component={Chat}
        options={{
          animation: 'fade_from_bottom',
          headerShadowVisible: false,
          headerTintColor: colors.white,
          title: 'Discussion',
          headerStyle: {
            backgroundColor: colors.light
          }
        }}
      />
    </StackNavigator.Navigator>
  )
}

export default AppNavigator
