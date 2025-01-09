namespace PRODUCT {
  export type getBasketRes = cart[];
  export type getBasketReq = void;

  type getCartItemRes = cart_item;
  type getCartItemReq = void;

  type addToBasketRes = cart_item;
  type addToBasketReq = number;
}
