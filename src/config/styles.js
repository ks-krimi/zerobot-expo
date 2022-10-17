import { Platform } from 'react-native'

import colors from './colors'

export default {
  colors,
  text: {
    color: colors.white,
    fontSize: 18,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir'
  }
}
