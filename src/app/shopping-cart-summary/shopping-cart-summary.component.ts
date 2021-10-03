import {Component, Input, OnInit} from '@angular/core';
import {ShoppingCart} from '../Models/shopping-cart';
import {MatTableDataSource} from '@angular/material/table';
import {ShoppingCartItem} from '../Models/shopping-cart-item';
import {Observable} from 'rxjs';
import {ShoppingCartService} from '../services/shopping-cart.service';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit {
  @Input('subTotal') subTotal: number;
  dataSource: MatTableDataSource<ShoppingCartItem>;
  displayedColumns = ['product', 'price'];
  cart$: Observable<ShoppingCart>;
  cart: ShoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.shoppingCartService.getCart().then(cart => {
      this.cart$ = cart;
      this.setDataSource();
    });
  }

  setDataSource() {
    this.cart$.subscribe(cart => {
      this.cart = cart;
      this.dataSource = new MatTableDataSource<ShoppingCartItem>(cart.getAll());
    });
  }
}
