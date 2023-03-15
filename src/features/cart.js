import { createSlice } from '@reduxjs/toolkit'
import { uniqBy } from 'lodash'

const initialState = {
  cartItems: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      return {
        ...(state || {}),
        cartItems: uniqBy([...(state?.cartItems || []), action.payload], 'id'),
      }
    },
    removeFromCart: (state, action) => {
      return {
        ...(state || {}),
        cartItems: [...(state?.cartItems || [])]?.filter(
          (s) => s?.id !== action?.payload
        ),
      }
    },
  },
})

export const { addToCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer
