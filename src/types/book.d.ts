export interface Book {
  id: number;
  title: string;
  price: number;
  author?: string;
  description?: string;
  coverImage?: string;
}