namespace PRODUCT {
  export type getBasketRes = cart[];
  export type getBasketReq = void;

  export type addToBasketRes = {
    success: boolean;
    message: string;
  };

  export type addToBasketReq = {
    clothes_id: number; // Eklenmek istenen ürün ID'si
    quantity: number;   // Eklenmek istenen ürün miktarı
  };
}
