import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import {map, take} from 'rxjs/operators';
import {ShoppingCart} from '../Models/shopping-cart';
import {ShoppingCartItem} from '../Models/shopping-cart-item';
import {Product} from '../Models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) {
  }

  create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart() {
    return (await this._getCart()).valueChanges().pipe(map(c => new ShoppingCart(c.items)));
  }

  async addToCart(productKey: string, title: string, price: string, imageUrl: string) {
    this.changeQuantity(productKey, 1, title, price, imageUrl);
  }

  async removeFromCart(productKey, title: string, price: string, imageUrl: string) {
    this.changeQuantity(productKey, -1, title, price, imageUrl);
  }

  private async _getCart(): Promise<AngularFireObject<ShoppingCart>> {
    let cartId = await this.getOrCreateCart();
    return this.db.object('/shopping-carts/' + cartId);
  }

  private getItem(cartId: string, productId: string): AngularFireObject<ShoppingCartItem> {
    return this.db.object('shopping-carts/' + cartId + '/items/' + productId);
  }

  async clearCart() {
    const cartId = await this.getOrCreateCart();
    this.db.object('shopping-carts/' + cartId + '/items').remove();
  }

  private async getOrCreateCart(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async changeQuantity(key: string, change: number, productTitle: string, productPrice: string, productImageUrl: string) {
    let cartId = await this.getOrCreateCart();
    let item$ = this.getItem(cartId, key);
    item$.valueChanges().pipe(take(1)).subscribe(item => {
      if (item) {
        item$.update({
          productKey: key,
          quantity: (item.quantity) + change,
          title: productTitle,
          price: productPrice,
          imageUrl: productImageUrl
        });
        item$.valueChanges().subscribe(newItem => {
          if (newItem.quantity === 0) {
            item$.remove();
          }
        });
      } else {
        item$.update({
          productKey: key,
          quantity: 1,
          title: productTitle,
          price: productPrice,
          imageUrl: productImageUrl
        });
      }
    });
  }
}

