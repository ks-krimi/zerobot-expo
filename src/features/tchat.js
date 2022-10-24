import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from '../http.common'

const initialState = {
  messages: [],
  loading: false,
  error: { status: false, message: '' }
}

export const getMessages = createAsyncThunk(
  'get/messages',
  async ({ setLoggedIn, defineAccessToken, removeAccessToken }, thunkAPI) => {
    try {
      const res = await axios({
        method: 'GET',
        url: 'messages/?limit=20'
      })
      if (res.status === 200) {
        setLoggedIn(true)
        defineAccessToken()
        return res.data
      }
      if (res.status === 401) {
        setLoggedIn(false)
        removeAccessToken()
        return thunkAPI.rejectWithValue({
          status: true,
          message: res.data.detail
        })
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ status: true, message: error.message })
    }
  }
)

export const sendMessage = createAsyncThunk(
  'send/message',
  async ({ data, setLoggedIn, showTemp }, thunkAPI) => {
    try {
      const res = await axios({
        method: 'POST',
        url: 'messages/',
        data
      })

      if (res.status === 201) {
        return res.data.sort((a, b) => (a.id > b.id ? 1 : -1))
      }

      if (res.status === 401) {
        // logout user if unauthorized response status
        setLoggedIn(false)
        return thunkAPI.rejectWithValue({
          status: true,
          message: res.data.detail
        })
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ status: true, message: error.message })
    } finally {
      showTemp(false)
    }
  }
)

const tchatSlice = createSlice({
  name: 'tchat',
  initialState,
  extraReducers: {
    [getMessages.pending]: (state) => {
      state.loading = true
    },
    [getMessages.fulfilled]: (state, action) => {
      state.loading = false
      state.messages = action.payload
      state.error = { status: false, message: '' }
    },
    [getMessages.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    [sendMessage.pending]: (state) => {
      state.loading = true
    },
    [sendMessage.fulfilled]: (state, action) => {
      state.loading = false
      state.messages.push(...action.payload)
      state.error = { status: false, message: '' }
    },
    [sendMessage.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

export default tchatSlice.reducer
