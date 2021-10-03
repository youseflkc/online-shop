import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../Models/shopping-cart';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../services/product.service';
import { ShoppingCartItem } from '../Models/shopping-cart-item';
import { Product } from '../Models/product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})

export class ShoppingCartComponent implements OnDestroy, AfterViewInit {
  cart$: Observable<ShoppingCart>;
  productList = [];
  dataSource;
  totalQuantity = 0;
  displayedColumns = ['product', 'quantity', 'price'];
  subscription;

  constructor(private shoppingCartService: ShoppingCartService, private productService: ProductService) {
  }

  setDataSource() {

    this.subscription = this.cart$.subscribe(products => {
      this.productList = products.getAll();
      this.totalQuantity = products.totalItemsQuantity;
      this.dataSource = new MatTableDataSource(this.productList);
    });
  }

  getSubTotal(): number {
    let total = 0;
    for (let product of this.productList) {
      total += product.price * product.quantity;
    }
    return total;
  }

  ngAfterViewInit() {
    this.shoppingCartService.getCart().then(cart => {
      this.cart$ = cart;
      this.setDataSource();
    });
  }

  ngOnDestroy() {
  }

  addToCart(product: ShoppingCartItem) {
    this.shoppingCartService.addToCart(
      product.productKey,
      product.title,
      product.price,
      product.imageUrl
    );
  }

  removeFromCart(product: ShoppingCartItem) {
    this.shoppingCartService.removeFromCart(
      product.productKey,
      product.title,
      product.price,
      product.imageUrl
    );
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }
}
