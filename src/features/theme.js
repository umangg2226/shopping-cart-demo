import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  darkMode: true,
  successMessage: '',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      return {
        ...(state || {}),
        darkMode: !state?.darkMode,
      }
    },
    showSuccess: (state, action) => {
      return {
        ...(state || {}),
        successMessage: action.payload,
      }
    },
  },
})

export const { toggleTheme, showSuccess } = themeSlice.actions

export default themeSlice.reducer
