import { ADD_TOTAL_AMOUNT, ADD_TO_CART, CART_QUANTITY, CLEAR_CART_ITEMS, ONCHANGE_CART_QUANTITY, REMOVE_FROM_CART } from "./constant/allConstant";

export const initData = {
  data: []
}


export const cartReducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART:
      return {
        data: [...state.data, payload]
      }
    case REMOVE_FROM_CART:
      const filteredItems_onremove = state.data.filter(item => item._id !== payload._id);
      return {
        data: filteredItems_onremove
      }

    case CART_QUANTITY:
      const filteredItems_onclick = state.data.map(item => item._id === payload._id ? payload : { ...item });
      return {
        data: filteredItems_onclick
      }

    case ONCHANGE_CART_QUANTITY:
      const filteredItems_onchange = state.data.map(item => item._id === payload._id ? payload : { ...item });
      return {
        data: filteredItems_onchange
      }

    case CLEAR_CART_ITEMS:
      return {
        data: []
      }

    default:
      return state;
  }
}


export const initTotalAmount = {
  price: null
};

export const totalAMountReducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_TOTAL_AMOUNT:
      return {
        price:payload
      }

    default:
      return state
  }
}

