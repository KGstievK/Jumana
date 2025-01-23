namespace ICATEGORY {
  type getAllClothesRes = AllClothes[];
  type getAllClothesReq = void;

  type getClothesByIdRes = clothesById;
  type getClothesByIdReq = number;

  type getCategoryRes = category[];
  type getCategoryReq = void;

  type postToFavoreRes = PostToFavoriteRes[];

  type postToFavoreReq = PostToFavoriteReq;

  type getToFavoreRes = GetFavorites[];
  type getToFavoreReq = void;

  type deleteFavoreRes = GetFavorites[];
  type deleteFavoreReq = number;
}
