import { configureStore } from '@reduxjs/toolkit'
import cart from '../features/cart'
import theme from '../features/theme'

export const store = configureStore({
  reducer: {
    cart,
    theme,
  },
})
