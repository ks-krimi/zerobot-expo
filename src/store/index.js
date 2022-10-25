import { configureStore } from '@reduxjs/toolkit'

import loginReducer from '../features/login'
import registerReducer from '../features/register'
import tchatReducer from '../features/tchat'

const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    tchat: tchatReducer
  }
})

export default store
