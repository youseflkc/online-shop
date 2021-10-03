import {Component, OnDestroy, OnInit} from '@angular/core';
import {Shipping} from '../Models/shipping';
import {ShoppingCartService} from '../services/shopping-cart.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable, timer} from 'rxjs';
import {ShoppingCart} from '../Models/shopping-cart';
import {OrderService} from '../services/order.service';
import {AuthenticationService} from '../services/authentication.service';
import {Order} from '../Models/order';
import {Router} from '@angular/router';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping: Shipping = {name: '', address1: '', address2: '', city: ''};
  cart$: Observable<ShoppingCart>;
  cart: ShoppingCart;
  cartSubscription;
  userSubscription;

  orderPlaced = false;

  productList = [];
  totalQuantity: number;
  dataSource;
  userId;

  displayedColumns = ['product', 'price'];

  constructor(
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private router: Router) {
  }

  ngOnInit(): void {
    this.shoppingCartService.getCart().then(cart => {
      this.cart$ = cart;
      this.setDataSource();
    });
    this.userSubscription = this.authService.getUser().subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  setDataSource() {
    this.cartSubscription = this.cart$.subscribe(products => {
      this.cart = products;
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

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart, this.getSubTotal());
    let result = await this.orderService.placeOrder(order);
    this.orderPlaced = true;
    timer(1300).subscribe(response => {
      this.snackBar.open('Order Placed', '', {duration: 2000});
      this.router.navigate(['/order-success', result.key]);
    });
  }
}
