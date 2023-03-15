import { createSlice } from '@reduxjs/toolkit'
import { uniqBy } from 'lodash'

const initialState = {
  cartItems: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, payload) => {
      return {
        ...(state || {}),
        cartItems: uniqBy([...(state?.cartItems || []), payload]),
      }
    },
    removeFromCart: (state) => {
      return state
    },
  },
})

export const { addToCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer
