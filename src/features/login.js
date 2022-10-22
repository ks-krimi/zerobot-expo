import AsyncStorage from '@react-native-async-storage/async-storage'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from '../http.common'
import { createFormData } from '../utils'

const initialState = {
  accessToken: null,
  loading: false,
  error: { status: false, message: '' }
}

export const login = createAsyncThunk(
  'auth/login',
  async (
    { credentials, onSuccess: { bottomSheet, setLoggedIn, helpers } },
    thunkAPI
  ) => {
    try {
      const data = createFormData(credentials)
      const res = await axios({
        headers: { 'Content-Type': 'multipart/form-data' },
        method: 'POST',
        url: 'login',
        data
      })
      if (res.status === 200) {
        AsyncStorage.setItem('token', JSON.stringify(res.data))
        setLoggedIn(true)
        helpers.resetForm()
        bottomSheet.dismiss()
        return res.data
      }
      if (res.status === 404) {
        AsyncStorage.removeItem('token')
        defineAccessToken(null)
        helpers.setSubmitting(false)
        return thunkAPI.rejectWithValue({
          status: true,
          message: res.data.detail
        })
      }
    } catch (error) {
      helpers.setSubmitting(false)
      return thunkAPI.rejectWithValue({ status: true, message: err.message })
    }
  }
)

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    defineAccessToken: (state, action) => {
      state.accessToken = action.payload
    },
    removeError: (state, _) => {
      state.error.status = false
      state.error.message = ''
    }
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false
      state.accessToken = action.payload
      state.error = { status: false, message: '' }
    },
    [login.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const { defineAccessToken, removeError } = loginSlice.actions
export default loginSlice.reducer
