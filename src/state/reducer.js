import { LANGUAGE, UPDATE_LANGUAGE, ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from './constants';

export const INITIAL_STATE = {
  language: 'en',
  cart: [],
};

const addToCartOrUpdateQuantity = (cart, item) => {
  let tempCart = cart;
  let existingQuantity = cart.find(({ id }) => id === item.id)?.quantity || 0;
  if (!existingQuantity) {
    tempCart = [...cart, item];
  }
  existingQuantity += 1;
  tempCart.find(({ id }) => id === item.id).quantity = existingQuantity;
  return tempCart;
};

const removeFromCart = (cart, item) => cart.filter(({ id }) => id !== item.id);

const reducer = (state, { type, payload }) => {
  let newCart = state?.cart || [];
  switch (type) {
    case UPDATE_LANGUAGE:
      localStorage.setItem(LANGUAGE, payload.language);
      return { ...state, language: payload.language };
    case ADD_TO_CART:
      newCart = addToCartOrUpdateQuantity(state.cart, payload.item);
      return { ...state, cart: newCart };
    case REMOVE_FROM_CART:
      newCart = removeFromCart(state.cart, payload.item);
      return { ...state, cart: newCart };
    case CLEAR_CART:
      return { ...state, cart: [] };
    default:
      return INITIAL_STATE;
  }
};

export default reducer;
