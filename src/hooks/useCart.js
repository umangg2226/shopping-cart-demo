import {
  addToCart as addToCartMETHOD,
  removeFromCart as removeFromCardMETHOD,
  increaseItemQty,
  decreaseItemQty,
  resetCart as resetCartMethod,
} from '../features/cart'
import { useDispatch, useSelector } from 'react-redux'

const useCart = () => {
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart)

  const addToCart = (item) => {
    dispatch(
      addToCartMETHOD({
        id: item?.id,
        qty: 1,
        image: item?.images?.[0],
        price: item?.price,
        title: item?.title,
        description: item?.description,
        discountPercentage: item?.discountPercentage,
      })
    )
  }

  const removeFromCart = (item) => {
    dispatch(removeFromCardMETHOD(item?.id))
  }

  const addQty = (item) => {
    dispatch(increaseItemQty(item?.id))
  }

  const removeQty = (item) => {
    dispatch(decreaseItemQty(item?.id))
  }

  const resetCart = () => {
    dispatch(resetCartMethod())
  }

  return { addToCart, removeFromCart, cartItems, addQty, removeQty, resetCart }
}

export default useCart
