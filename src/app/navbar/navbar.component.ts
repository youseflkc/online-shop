import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Observable} from 'rxjs';
import firebase from 'firebase';
import {AppUser} from '../Models/app-user';
import {ShoppingCartService} from '../services/shopping-cart.service';
import {ShoppingCart} from '../Models/shopping-cart';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: AppUser;
  cart$: Observable<ShoppingCart>;
  totalQuantity = 0;

  imgLogoUrl = 'https://seeklogo.com/images/G/grocery-store-logo-3B65A40953-seeklogo.com.png';

  constructor(private authService: AuthenticationService, private shoppingCartService: ShoppingCartService) {
    authService.appUser$.subscribe(appUser => this.user = appUser);
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.cart$.subscribe(cart => this.totalQuantity = cart.totalItemsQuantity);
  }

  logout() {
    this.authService.logout();
  }


}
