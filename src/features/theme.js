import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  darkMode: true,
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
  },
})

export const { toggleTheme } = themeSlice.actions

export default themeSlice.reducer
