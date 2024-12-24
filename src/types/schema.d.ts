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
