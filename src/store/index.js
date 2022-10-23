import { configureStore } from '@reduxjs/toolkit'

import loginReducer from '../features/login'
import tchatReducer from '../features/tchat'

const store = configureStore({
  reducer: {
    login: loginReducer,
    tchat: tchatReducer
  }
})

export default store
