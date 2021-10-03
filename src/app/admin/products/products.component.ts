import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {Product} from '../../Models/product';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import * as _ from 'lodash';
import {ShoppingCartService} from '../../services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<{ key: string, value: Product }>();
  productList: {
    key: string,
    value: Product
  }[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  filteredProducts;
  displayedColumns = ['value.title', 'value.price', 'value.category', 'edit'];
  subscription;
  cart;

  constructor(private productService: ProductService, private router: Router, private shoppingCartService: ShoppingCartService) {
    this.productList = [];
  }

  async ngOnInit() {
    this.subscription = this.getProductList();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addProduct() {
    this.router.navigate(['edit-product/new']);
  }

  getProductList() {
    return this.productService.getAll().snapshotChanges()
      .subscribe(products => {
        products.forEach(product => {
          this.productList.push({
            key: product.key,
            value: {
              title: product.payload.val().title,
              price: product.payload.val().price,
              category: product.payload.val().category,
              imageUrl: product.payload.val().imageUrl
            }
          });
          this.filteredProducts = this.productList;
          this.setDataSource();
        });
      });
  }

  setDataSource() {
    this.dataSource = new MatTableDataSource<{ key: string, value: Product }>(this.filteredProducts);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = _.get;
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.productList.filter(p => p.value.title.toLowerCase().includes(query.toLowerCase())) :
      this.productList;
    this.setDataSource();
  }
}
