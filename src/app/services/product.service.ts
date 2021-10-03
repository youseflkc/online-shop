import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Product} from '../Models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase, private router: Router) {
  }

  getAll(): AngularFireList<Product> {
    return this.db.list('/products');
  }

  getProduct(id: string): AngularFireObject<Product> {
    return this.db.object('/products/' + id);
  }

  getNumberOfProducts(): number {
    this.getAll().valueChanges().subscribe(products => {

    });
    return 0;
  }

  create(product) {
    this.db.list('/products').push(product);
  }

  update(product, productID) {
    return this.db.object('/products/' + productID).update(product);
  }

  delete(id: string) {
    this.db.object('/products/' + id).remove().then(response => {
      this.router.navigate(['admin/products']);
    });
  }

}
