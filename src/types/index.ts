export interface Category {
  id: string;
  name: string;
  count: string;
  icon: string;
  imageUrl: string;
  bgColor?: string;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
  popular?: boolean;
  calories?: number;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  deliveryTime: string;
  rating: number;
  reviewsCount?: number;
  priceLevel: '$' | '$$' | '$$$' | '$$$$';
  isFreeDelivery: boolean;
  deliveryFee: number;
  imageUrl: string;
  featuredTag?: string;
  popularTag?: string;
  menu?: FoodItem[];
  address?: string;
}

export interface CartItem {
  id: string;
  restaurantId: string;
  restaurantName: string;
  food: FoodItem;
  quantity: number;
  instructions?: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string; // Icon identifier
}

export interface PromoCode {
  code: string;
  discountPercentage: number;
  description: string;
}
