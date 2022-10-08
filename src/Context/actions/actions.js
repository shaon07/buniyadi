import { ADD_TOTAL_AMOUNT, ADD_TO_CART, CART_QUANTITY, CLEAR_CART_ITEMS, ONCHANGE_CART_QUANTITY, REMOVE_FROM_CART } from "../constant/allConstant"

export const addToCart = (data) => {
  return {
    type: ADD_TO_CART,
    payload: data
  }
}

export const removeFromCart = (data) => {
  return {
    type: REMOVE_FROM_CART,
    payload: data
  }
}

export const cartQuantity = (data) => {
  return {
    type: CART_QUANTITY,
    payload: data
  }
}

export const onChangeCartQuantity = (data, qtty, totalPrice) => {
  return {
    type: ONCHANGE_CART_QUANTITY,
    payload: { ...data, quantity: qtty, totalPrice: totalPrice }
  }
}

export const clearCartItem = () => {
  return {
    type: CLEAR_CART_ITEMS,
  }
}

export const addTotalAmount = (data) => {
  return {
    type: ADD_TOTAL_AMOUNT,
    payload: data
  }
}