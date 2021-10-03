import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {LoginComponent} from './login/login.component';
import {MyOrdersComponent} from './my-orders/my-orders.component';
import {AdminOrdersComponent} from './admin/admin-orders/admin-orders.component';
import {ProductsComponent} from './admin/products/products.component';
import {CheckOutComponent} from './check-out/check-out.component';
import {AuthGuard} from './services/auth-guard.service';
import {AccessDeniedComponent} from './access-denied/access-denied.component';
import {AdminAuthGaurd} from './admin-auth-gaurd.service';
import {EditProductComponent} from './admin/edit-product/edit-product.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {OrderService} from './services/order.service';
import {OrderSuccessComponent} from './order-success/order-success.component';

const routes: Routes = [
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'order-success/:id', component: OrderSuccessComponent},
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard]},
  {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
  {path: 'edit-product/:id', component: EditProductComponent, canActivate: [AuthGuard, AdminAuthGaurd]},
  {path: 'admin/admin-orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGaurd]},
  {path: 'admin/products', component: ProductsComponent, canActivate: [AuthGuard, AdminAuthGaurd]},
  {path: 'access-denied', component: AccessDeniedComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
