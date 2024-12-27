interface User {
  _id?: number;
  email: string;
  addres: string;
  userName: string;
  phone: string;
}

interface AllClothes {
  id: number;
  clothes_photo: any;
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
