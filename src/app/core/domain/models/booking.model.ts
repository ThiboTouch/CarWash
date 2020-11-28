import { Product } from './product.model';

export interface Booking {
  id: number;
  timeIn: string;
  estimatedTimeOut: string;
  status: string;
  notes: string;
  currentUser: boolean;
  position: number;
  code: string;
  product: Product;
}
