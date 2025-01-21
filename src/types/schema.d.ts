interface User {
  _id?: number;
  // image: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  index_pochta: string;
  number: string;
}

// interface AllClothes {
//   id: number;
//   clothes_photo: string;
//   promo_category: Array<{
//     promo_category: string;
//   }>;
//   clothes_name: string;
//   price: number;
//   discount_price: number;
//   size: any;
//   color: Array<{
//     id: number;
//     color: string;
//   }>;
//   average_rating: number;
//   created_date: string;
// }

interface cart {
  id: number
  clothes: {
    clothes_name: string
    clothes_img: Array<{
      id: number
      photo: string
      color: string
    }>
  }
  size: string
  color: number
  quantity: number
  price_clothes: string
  total_price: string
  color_id: number
  clothes_id: number
}
interface get_cart_item {
  id: number
  clothes: {
    clothes_name: string
    clothes_img: Array<{
      id: number
      photo: string
      color: string
    }>
  }
  clothes_id: number
  quantity: number
  size: string
  color: {
    id: number
    photo: string
    color: string
  }
  color_id: number
}

interface post_cart_item {
  clothes: {
    clothes_name: string
  }
  clothes_id: number
  quantity: number
  size: string
  color: {
    color: string
  }
  color_id: number
}

interface clothesById {
  id: number;
  clothes_name: string;
  clothes_photo: string;
  category: Array<{
    category_name: string;
  }>;
  promo_category: Array<{
    promo_category: string;
    time: any;
  }>;
  quantities: number;
  active: boolean;
  price: number;
  discount_price: number;
  size: Array<string>;
  average_rating: number;
  made_in: string;
  textile_clothes: Array<{
    textile_name: string;
  }>;
  clothes_img: Array<{
    id: number;
    photo: string;
    color: string;
  }>;
  clothes_review: Array<any>;
  clothes_description: string;
}

interface category {
  category_name: string;
  clothes_category: Array<{
    id: number;
    promo_category: Array<{
      promo_category: string;
    }>;
    clothes_name: string;
    price: number;
    discount_price: number;
    size: Array<string>;
    average_rating: number;
    created_date: string;
    clothes_img: Array<{
      photo: string;
      color: string;
    }>;
  }>;
}
//! data type
interface Category {
  category_name: string;
}

interface Review {
  author: {
    name: string;
    avatar: string; // Допустим, можно добавить фото автора
  };
  text: string;
  stars: number;
  review_photo: string | null;
  created_date: string;
}

interface Color {
  id: number;
  color: string;
  color_photo: string[];
}

interface PromoCategory {
  promo_category: string;
  time: string | null;
}

interface Textile {
  textile_name: string;
}

interface SingleProductData {
  clothes_name: string;
  category: Array<{
    category_name: string;
  }>;
  promo_category: Array<{
    promo_category: string;
    time: any;
  }>;
  quantities: number;
  active: boolean;
  price: number;
  discount_price: number;
  size: Array<string>;
  average_rating: number;
  made_in: string;
  textile_clothes: Array<{
    textile_name: string;
  }>;
  clothes_img: Array<{
    photo: string;
    color: string;
    id: number;
  }>;
  clothes_review: Array<any>;
  clothes_description: string;
}

//! data type
