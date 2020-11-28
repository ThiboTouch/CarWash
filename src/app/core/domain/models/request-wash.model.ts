import { Product } from './product.model';

export interface Request {
  id: number;
  serviceProviderName: string;
  serviceProviderCompany: string;
  status: string;
  statusDetails: string;
  currentUser: boolean;
  product: Product;
  customer: string;
  location: string;
  distance: string;
}
