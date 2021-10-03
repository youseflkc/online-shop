import {ShoppingCartItem} from './shopping-cart-item';
import {Product} from './product';

export class ShoppingCart {

  constructor(public items: ShoppingCartItem[]) {
  }

  get productIds() {
    return Object.keys(this.items);
  }

  getAll(): ShoppingCartItem[] {
    let all = [];
    for (const key in this.items) {
      all.push(this.items[key]);
    }
    return all;
  }

  getQuantity(productKey) {
    if (this.isEmpty()) {
      return 0;
    }
    let item = this.items[productKey];
    return item ? item.quantity : 0;
  }

  get totalItemsQuantity() {
    let count = 0;
    for (const productKey in this.items) {
      count += this.items[productKey].quantity;
    }
    return count;
  }

  isEmpty() {
    if (this.items) {
      return false;
    }
    return true;
  }
}
