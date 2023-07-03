import { createSlice } from "@reduxjs/toolkit"

const profileSlice = createSlice({
  name: 'profile',
  initialState: {},
  reducers: {
    profile: (state, action) => {
      const { username, email } = action.payload
      state.username = username
      state.email = email
    }
  }
})

export const { profile } = profileSlice.actions

export default profileSlice.reducer

export const selectCurrentUsername = (state) => state.profile.username
export const selectCurrentEmail = (state) => state.profile.email
