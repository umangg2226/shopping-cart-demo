import { configureStore } from '@reduxjs/toolkit'
import cart from '../features/cart'
import theme from '../features/theme'
import filters from '../features/filters'

export const store = configureStore({
  reducer: {
    cart,
    theme,
    filters,
  },
})
