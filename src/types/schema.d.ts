interface User {
  username: string
  first_name: string
  last_name: string
  address: string
  index_pochta: string
  number: string
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
  id: 0;
  user: {
    first_name: string;
    last_name: string;
  };
  items: [
    {
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
        size: string;
        color: [
          {
            color: string;
            color_photo: [
              {
                photo: string;
                color_connect: number;
              }
            ];
          }
        ];
        average_rating: string;
        created_date: string;
      };
      clothes_id: number;
      quantity: number;
    }
  ];
  total_price: string;
}

interface clothesById {
  clothes_name: string;
  clothes_photo: string;
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
  size: Array<string>;
  average_rating: number;
  made_in: string;
  textile_clothes: Array<{
    textile_name: string;
  }>;
  color: Array<{
    color: string;
    color_photo: Array<{
      photo: string;
      color_connect: number;
    }>;
  }>;
  clothes_review: Array<any>;
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
    size: Array<string>;
    color: Array<{
      color: string;
      color_photo: Array<{
        photo: string;
        color_connect: number;
      }>;
    }>;
    average_rating: number;
    created_date: string;
  }>;
}
