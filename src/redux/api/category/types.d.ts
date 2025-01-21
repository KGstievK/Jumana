namespace ICATEGORY {
  type getAllClothesRes = AllClothes[];
  type getAllClothesReq = void;

  type getClothesByIdRes = clothesById;
  type getClothesByIdReq = number;

  type getCategoryRes = category[];
  type getCategoryReq = void;

  type postToFavoreRes = PostToFavorite[];
  type postToFavoreReq = PostToFavorite;

  type getToFavoreRes = GetFavorites[];
  type getToFavoreReq = void;

  type deleteFavoreRes = GetFavorites[];
  type deleteFavoreReq = number;
}
