import {Shipping} from './shipping';
import {ShoppingCart} from './shopping-cart';
import {number} from 'ng2-validation/dist/number';

export class Order {
  datePlaced: number;
  items: any[];
  orderTotal: number;

  constructor(public userId, public shipping: Shipping, cart: ShoppingCart, orderTotal) {
    this.userId = userId;
    this.datePlaced = new Date().getTime();
    shipping = this.shipping;
    this.orderTotal = orderTotal;
    this.items = cart.getAll().map(item => {
      return {
        product: {
          title: item.title,
          price: item.price,
          imageUrl: item.imageUrl
        },
        quantity: item.quantity,
        totalPrice: Number(item.price) * item.quantity
      };
    });
  }

}
