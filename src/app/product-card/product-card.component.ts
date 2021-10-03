import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../Models/product';
import {ShoppingCartService} from '../services/shopping-cart.service';
import {ShoppingCart} from '../Models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: { key: string, value: Product };
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  @Input('show-actions') showActions = true;

  constructor(private shopCartService: ShoppingCartService) {
  }

  addToCart() {
    this.shopCartService.addToCart(this.product.key,
      this.product.value.title,
      this.product.value.price,
      this.product.value.imageUrl);
  }
}
