import { configureStore } from '@reduxjs/toolkit'

import loginReducer from '../features/login'

const store = configureStore({
  reducer: {
    login: loginReducer
  }
})

export default store
