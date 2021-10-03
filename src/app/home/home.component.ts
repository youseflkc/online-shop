import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Product} from '../Models/product';
import {CategoriesService} from '../services/categories.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ShoppingCartService} from '../services/shopping-cart.service';
import {ShoppingCart} from '../Models/shopping-cart';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {
  productList: { key: string, value: Product } [] = [];
  filteredProducts;
  categories$;
  selectedCategory;

  productSubscription;
  cartSubscription;

  cart: ShoppingCart;

  constructor(
    private productService: ProductService,
    private categoryService: CategoriesService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) {
  }

  async ngOnInit() {
    let response = (await this.shoppingCartService.getCart());
    response.subscribe(cart => {
      this.cart = cart;
    });

    this.productSubscription = this.productService.getAll().snapshotChanges()
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
            }
          );
          this.categoryService.getCategories().valueChanges()
            .subscribe(categories => {
              this.categories$ = categories;
            });
          this.route.queryParamMap.subscribe(category => {
            this.selectedCategory = category.get('category');
            if (this.selectedCategory === null) {
              this.selectedCategory = 'all';
            }
            this.filteredProducts = this.productList;
            this.filterCategory(this.selectedCategory);
          });
        }
      );
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }

  filterCategory(category: string) {
    if (category === 'all') {
      this.filteredProducts = this.productList;
      this.selectedCategory = 'all';
    } else {
      this.filteredProducts = this.productList
        .filter(p => p.value.category.toLowerCase() === category.toLowerCase());
      this.selectedCategory = category;
    }
  }
}

