import {
  addToCart as addToCartMETHOD,
  removeFromCart as removeFromCardMETHOD,
} from '../features/cart'
import { useDispatch, useSelector } from 'react-redux'

const useCart = () => {
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart)

  const addToCart = (item) => {
    dispatch(addToCartMETHOD({ id: item?.id, qty: 1 }))
  }

  const removeFromCart = (item) => {
    dispatch(removeFromCardMETHOD(item?.id))
  }

  return { addToCart, removeFromCart, cartItems }
}

export default useCart
