import { UPDATE_LANGUAGE, ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from './constants';

export function updateLanguage(language) {
  return {
    type: UPDATE_LANGUAGE,
    payload: { language },
  };
}

export function addToCart(item) {
  return {
    type: ADD_TO_CART,
    payload: { item },
  };
}

export function removeFromCart(item) {
  return {
    type: REMOVE_FROM_CART,
    payload: { item },
  };
}

export function clearCart() {
  return {
    type: CLEAR_CART,
  };
}
