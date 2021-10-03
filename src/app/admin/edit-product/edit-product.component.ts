import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {timer} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CategoriesService} from '../../services/categories.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  id: string;
  product: {
    title: string,
    price: string,
    category: string,
    imageUrl: string,
  };

  categories$;

  saving: boolean;
  deleting: boolean;

  placeHolderImageUrl = 'https://t4.ftcdn.net/jpg/02/07/87/79/360_F_207877921_BtG6ZKAVvtLyc5GWpBNEIlIxsffTtWkv.jpg';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoriesService,
    private snackBar: MatSnackBar
  ) {
    this.categoryService.getCategories().valueChanges()
      .subscribe(categories => {
        this.categories$ = categories;
      });

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(response => {
      this.id = response.get('id');
    });

    if (this.id.startsWith('new')) {
      this.product = {
        title: '',
        price: '',
        category: '',
        imageUrl: '',
      }
      ;
      console.log(this.id);
    } else {
      this.productService.getProduct(this.id).valueChanges()
        .subscribe(product => {
          if (product) {
            console.log(product);
            this.product = {
              title: product.title,
              price: product.price,
              category: product.category,
              imageUrl: product.imageUrl,
            };
          } else {
            this.return();
          }
        });
    }
  }

  return(): void {
    this.router.navigate(['**']);
  }

  save(product) {
    this.saving = true;
    timer(1000).subscribe(response => {
      this.saving = false;
      if (this.id === 'new') {
        this.productService.create(product);
      } else {
        this.productService.update(product, this.id);
      }
      this.snackBar.open('Saved', '', {duration: 2000});
      this.router.navigate(['admin/products']);
    });

  }

  delete() {
    if (!confirm('Are you sure you want to delete this product')) {
      return;
    }
    this.deleting = true;
    timer(1000).subscribe(response => {
      this.deleting = false;
      this.productService.delete(this.id);
      this.snackBar.open('Deleted', '', {duration: 2000});
      this.router.navigate(['/admin/products']);
    });
  }
}
