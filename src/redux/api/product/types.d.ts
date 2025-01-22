namespace PRODUCT {
  type getBasketRes = cart[];
  type getBasketReq = void;

  type getCartItemRes = get_cart_item;
  type getCartItemReq = void;

  type addToBasketRes = post_cart_item[];
  type addToBasketReq = post_cart_item;

  type editBasketRes = AllCart;
  type editBasketReq = {
    id?: number;
    updateBasket: patch_cart_item;
  };

  type deleteBasketRes = cart[];
  type deleteBasketReq = number;

  type getAllCartRes = AllCart;
  type getAllCartReq = void;
}
