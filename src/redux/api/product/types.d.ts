namespace PRODUCT {
  type getBasketRes = cart[];
  type getBasketReq = void;

  type getCartItemRes = get_cart_item;
  type getCartItemReq = void;

  type addToBasketRes = post_cart_item[];
  type addToBasketReq = post_cart_item;
}
