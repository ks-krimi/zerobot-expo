import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from '../http.common'

const initialState = {
  success: false,
  loading: false,
  error: { status: false, message: '' }
}

export const register = createAsyncThunk(
  'auth/register',
  async ({ credentials, onSuccess: { bottomSheet, helpers } }, thunkAPI) => {
    try {
      const { success } = thunkAPI.getState()
      const res = await axios({
        method: 'POST',
        url: 'users/',
        data: credentials
      })
      if (res.status === 201) {
        if (!success) {
          helpers.resetForm()
          bottomSheet.dismiss()
        }
      }
      if (res.status === 400) {
        return thunkAPI.rejectWithValue({
          status: true,
          message: 'Email déja pris'
        })
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ status: true, message: error.message })
    } finally {
      helpers.setSubmitting(false)
    }
  }
)

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    removeError: (state, _) => {
      state.error.status = false
      state.error.message = ''
    },
    reinitilize: (state, _) => {
      state.success = false
    }
  },
  extraReducers: {
    [register.pending]: (state, _) => {
      state.loading = true
    },
    [register.fulfilled]: (state, _) => {
      state.success = true
      state.loading = false
      state.error = { status: false, message: '' }
    },
    [register.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const { removeError, reinitilize } = registerSlice.actions
export default registerSlice.reducer
