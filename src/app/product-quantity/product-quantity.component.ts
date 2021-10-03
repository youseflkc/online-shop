import {Component, Input, OnInit} from '@angular/core';
import {ShoppingCartService} from '../services/shopping-cart.service';
import {Product} from '../Models/product';
import {ShoppingCart} from '../Models/shopping-cart';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  @Input('product') product: { key: string, value: Product };
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private shopCartService: ShoppingCartService) {
  }

  addToCart() {
    this.shopCartService.addToCart(this.product.key,
      this.product.value.title,
      this.product.value.price,
      this.product.value.imageUrl);
  }

  removeFromCart() {
    this.shopCartService.removeFromCart(
      this.product.key,
      this.product.value.title,
      this.product.value.price,
      this.product.value.imageUrl
    );
  }
}
