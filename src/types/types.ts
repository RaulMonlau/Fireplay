export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface CartItem {
  id: number;
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}
export interface Game {
  id: number;
  name: string;
  slug: string;
  background_image?: string;
  rating?: number;
  ratings_count?: number;
  genres?: { id: number; name: string }[];
}
export interface FavoriteItem {
  id: number;
  slug: string;
  name: string;
  image: string;
  added_at: Date;
}
interface AddToCartButtonProps {
  game: Game;
  fullWidth?: boolean;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  message: string;
  date: Date;
  userId?: string;
}