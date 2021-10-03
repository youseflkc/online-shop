import {Product} from './product';
import {ProductService} from '../services/product.service';

export class ShoppingCartItem {

  productKey: string;
  quantity: number;
  title: string;
  price: string;
  imageUrl: string;
}
