namespace ICATEGORY {
  type getAllClothesRes = AllClothes[];
  type getAllClothesReq = void;

  type getClothesByIdRes = clothesById;
  type getClothesByIdReq = number;

  type getCategoryRes = category[];
  type getCategoryReq = void;

  type postToFavoreRes = {
    id: number;
    clothes: {
      id: number;
      promo_category: { promo_category: string }[];
      clothes_name: string;
      price: number;
      discount_price: string;
      size: string;
      average_rating: string;
      created_date: string;
      clothes_img: { id: number; photo: string; color: string }[];
    };
    clothes_id: number;
    favorite_user: number;
  };
  type postToFavoreReq = {
    clothes: {
      promo_category: { promo_category: string }[];
      clothes_name: string;
      price: number;
      size: string;
    };
    clothes_id: number;
    favorite_user: number;
  };

  type getToFavoreRes = GetFavorites[];
  type getToFavoreReq = void;

  type deleteFavoreRes = GetFavorites[];
  type deleteFavoreReq = number;
}
