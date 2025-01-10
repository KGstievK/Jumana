interface User {
  username: string;
  first_name: string;
  last_name: string;
  address: string;
  index_pochta: string;
  number: string;
}

interface AllClothes {
  id: number;
  clothes_photo: string;
  promo_category: Array<{
    promo_category: string;
  }>;
  clothes_name: string;
  price: number;
  discount_price: number;
  size: any;
  color: Array<{
    id: number;
    color: string;
  }>;
  average_rating: number;
  created_date: string;
}

interface cart {
  id: number;
  user: {
    first_name: string;
    last_name: string;
  };
  items: Array<{
    clothes: {
      id: number;
      clothes_photo: string;
      promo_category: Array<{
        promo_category: string;
      }>;
      clothes_name: string;
      price: number;
      size: string;
      color: Array<{
        color: string;
        color_photo: Array<{
          photo: string;
          color_connect: number;
        }>;
      }>;
      average_rating: string;
      created_date: string;
    };
    clothes_id: number;
    quantity: number;
  }>;
  total_price: string;
}
interface cart_item {
  clothes: {
    id: number;
    clothes_photo: string;
    promo_category: [
      {
        promo_category: string;
      }
    ];
    clothes_name: string;
    price: number;
    discount_price: string;
    size: string;
    color: [
      {
        id: number;
        color: string;
      }
    ];
    average_rating: string;
    created_date: string;
  };
  clothes_id: number;
  quantity: number;
  size: string;
  color: {
    id: number;
    color: string;
  };
  color_id: number;
}

interface clothesById {
  clothes_name: string;
  clothes_photo: string;
  category: {
    category_name: string;
  }[];
  promo_category: {
    promo_category: string;
    time: string | null;
  }[];
  quantities: number;
  active: boolean;
  price: number;
  size: string[];
  average_rating: number;
  made_in: string;
  textile_clothes: {
    textile_name: string;
  }[];
  color: {
    id: number;
    color: string;
    color_photo: {
      photo: string;
      color_connect: number;
    }[];
  }[];
  clothes_review: any[];
}

interface category {
  category_name: string;
  clothes_category: Array<{
    id: number;
    clothes_photo: string;
    promo_category: Array<{
      promo_category: string;
    }>;
    clothes_name: string;
    price: number;
    discount_price: number;
    size: Array<string>;
    color: Array<{
      id: number;
      color: string;
    }>;
    average_rating: number;
    created_date: string;
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
  color_photo: string[]; // Массив фотографий для цвета
}

interface PromoCategory {
  promo_category: string;
  time: string | null;
}

interface Textile {
  textile_name: string;
}

interface SingleProductData {
  id: number;
  active: boolean;
  average_rating: number;
  category: Category[];
  clothes_name: string;
  clothes_photo: string;
  clothes_review: Review[];
  color: Color[];
  made_in: string;
  price: number;
  promo_category: PromoCategory[];
  quantities: number;
  size: string[];
  textile_clothes: Textile[];
}
//! data type
