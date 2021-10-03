import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {MyOrdersComponent} from './my-orders/my-orders.component';
import {ProductsComponent} from './admin/products/products.component';
import {AdminOrdersComponent} from './admin/admin-orders/admin-orders.component';
import {CheckOutComponent} from './check-out/check-out.component';
import {AuthenticationService} from './services/authentication.service';
import {AuthGuard} from './services/auth-guard.service';
import {UserService} from './services/user.service';
import {AccessDeniedComponent} from './access-denied/access-denied.component';
import {AdminAuthGaurd} from './admin-auth-gaurd.service';
import {EditProductComponent} from './admin/edit-product/edit-product.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {FormsModule} from '@angular/forms';
import {CustomFormsModule} from 'ng2-validation';
import {ProductCardComponent} from './product-card/product-card.component';
import {AngularMaterialModule} from './angular-material.module';
import {ShoppingCartService} from './services/shopping-cart.service';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    ShoppingCartComponent,
    MyOrdersComponent,
    ProductsComponent,
    AdminOrdersComponent,
    CheckOutComponent,
    AccessDeniedComponent,
    EditProductComponent,
    PageNotFoundComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    OrderSuccessComponent,
    ShoppingCartSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    CustomFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularMaterialModule
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    UserService,
    AdminAuthGaurd,
    ShoppingCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
