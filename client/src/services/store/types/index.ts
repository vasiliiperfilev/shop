export interface ItemResponse {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: { rate: number; count: number };
}

export interface Item extends ItemResponse {
  link: string;
}
