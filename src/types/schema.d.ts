interface User {
  _id?: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  index_pochta: string;
  number: string;
}

interface GetContactInfo {
  messenger: string;
  email: string;
  address: string;
}

interface SaleContent {
  img: string;
  title: string;
  text: string;
}

interface AllClothes {
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
    id: number;
    photo: string;
    color: string;
  }>;
}

interface AllCart {
  id: number;
  user: number;
  total_price: string;
  cart_items: Array<{
    id: number;
    clothes: {
      clothes_name: string;
      clothes_img: Array<{
        id: number;
        photo: string;
        color: string;
      }>;
    };
    size: string;
    color: number;
    quantity: number;
    price_clothes: string;
    total_price: string;
    color_id: number;
    clothes_id: number;
    just_price: string;
  }>;
}
interface cart {
  id: number;
  clothes: {
    clothes_name: string;
    clothes_img: Array<{
      id: number;
      photo: string;
      color: string;
    }>;
  };
  size: string;
  color: number;
  quantity: number;
  price_clothes: string;
  total_price: string;
  color_id: number;
  clothes_id: number;
  just_price: string;
}
interface get_cart_item {
  id: number;
  clothes: {
    clothes_name: string;
    clothes_img: Array<{
      id: number;
      photo: string;
      color: string;
    }>;
  };
  clothes_id: number;
  quantity: number;
  size: string;
  color: {
    id: number;
    photo: string;
    color: string;
  };
  color_id: number;
  just_price: string;
}

interface post_cart_item {
  clothes: {
    clothes_name: string;
  };
  clothes_id: number;
  quantity: number;
  size: string;
  color: {
    color: string;
  };
  color_id: number;
}
interface patch_cart_item {
  quantity: number;
}

interface AboutUs {
  title: string;
  made: string;
  logo: string;
  about_me: Array<{
    title: string;
    text: string;
    img: string;
  }>;
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

interface IOrderPost {
  order_user: number;
  cart_id: number;
  delivery: "курьер" | "самовывоз";
  first_name: string;
  phone_number: string;
  city: string;
  address: string;
}
interface IOrder {
  id: number;
  cart: {
    id: number;
    user: number;
    total_price: string;
    cart_items: Array<{
      id: number;
      clothes: {
        clothes_name: string;
        clothes_img: Array<{
          id: number;
          photo: string;
          color: string;
        }>;
      };
      size: string;
      color: number;
      quantity: number;
      price_clothes: string;
      total_price: string;
      color_id: number;
      clothes_id: number;
      just_price: string;
    }>;
  };
  date: string;
  order_status: string;
  delivery: string;
  first_name: string;
  phone_number: string;
  city: string;
  address: string;
}
interface Pay {
  pay_img: string;
  whatsapp: string;
}

interface SingleProductData {
  id: number;
  clothes_name: string;
  category: Array<{
    category_name: string;
  }>;
  promo_category: Array<{
    promo_category: string;
    time: string;
  }>;
  quantities: number;
  active: boolean;
  price: number;
  discount_price: string;
  size: string;
  average_rating: string;
  made_in: string;
  textile_clothes: Array<{
    textile_name: string;
  }>;
  clothes_img: Array<{
    id: number;
    photo: string;
    color: string;
  }>;
  clothes_review: Array<{
    author: {
      first_name: string;
      last_name: string;
    };
    text: string;
    stars: number;
    review_photo: string;
    created_date: string;
  }>;
  clothes_description: string;
}

interface getOrderitem {
  id: number;
  cart: {
    id: number;
    user: number;
    total_price: string;
    cart_items: Array<{
      id: number;
      clothes: {
        clothes_name: string;
        clothes_img: Array<{
          id: number;
          photo: string;
          color: string;
        }>;
      };
      size: string;
      color: number;
      quantity: number;
      price_clothes: string;
      total_price: string;
      color_id: number;
      clothes_id: number;
      just_price: string;
    }>;
  };
  date: string;
  order_status: string;
  delivery: string;
  order_info: {
    first_name: string;
    phone_number: string;
    city: string;
    address: string;
  };
}

//! data type

interface PostToFavoriteRes {
  id: number;
  clothes: {
    id: number;
    promo_category: Array<{
      promo_category: string;
    }>;
    clothes_name: string;
    price: number;
    discount_price: string;
    size: string;
    average_rating: string;
    created_date: string;
    clothes_img: Array<{
      id: number;
      photo: string;
      color: string;
    }>;
  };
  clothes_id: number;
  favorite_user: number;
}

interface PostToFavoriteReq {
  clothes: {
    promo_category: Array<{
      promo_category: string;
    }>;
    clothes_name: string;
    price: number;
    size: string;
  };
  clothes_id: number;
  favorite_user: number;
}

interface GetFavorites {
  id: number;
  clothes: {
    id: number;
    promo_category: Array<{
      promo_category: string;
    }>;
    clothes_name: string;
    price: number;
    discount_price: string;
    size: string;
    average_rating: string;
    created_date: string;
    clothes_img: Array<{
      id: number;
      photo: string;
      color: string;
    }>;
  };
  time: string;
}

interface firstSection {
  img1: string;
  img2: string;
  img3: string;
  made: string;
  title: string;
}
