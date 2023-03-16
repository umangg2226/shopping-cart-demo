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
    increaseItemQty: (state, action) => {
      return {
        ...(state || {}),
        cartItems: [...(state?.cartItems || [])]?.map((s) => {
          if (action?.payload === s?.id) {
            return {
              ...s,
              qty: s?.qty + 1,
            }
          }

          return {
            ...s,
          }
        }),
      }
    },
    decreaseItemQty: (state, action) => {
      return {
        ...(state || {}),
        cartItems: [...(state?.cartItems || [])]?.map((s) => {
          if (action?.payload === s?.id) {
            return {
              ...s,
              qty: s?.qty - 1,
            }
          }

          return {
            ...s,
          }
        }),
      }
    },
    resetCart: (state) => {
      return {
        ...(initialState || {}),
      }
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  increaseItemQty,
  decreaseItemQty,
  resetCart,
} = cartSlice.actions

export default cartSlice.reducer
