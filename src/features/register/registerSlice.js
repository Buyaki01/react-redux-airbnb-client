import { createSlice } from "@reduxjs/toolkit"

const registerSlice = createSlice({
  name: 'register',
  initialState: { 
    username: '',
    email: '',
    password: '',
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload
    },
    setEmail: (state, action) => {
      state.email = action.payload
    },
    setPassword: (state, action) => {
      state.password = action.payload
    }
  }
})

export const { setUsername, setEmail, setPassword } = registerSlice.actions

export default registerSlice.reducer

export const selectCurrentEmail = (state) => state.register.email