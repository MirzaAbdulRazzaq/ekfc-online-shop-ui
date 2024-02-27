import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/products/products';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: Products[] = [];
  loading: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: (respnse) => {
        this.products = respnse.product;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  getAllProductsByCategory(category: string) {
    this.loading = true;
    this.productService.getProductByCategory(category).subscribe({
      next: (respnse) => {
        this.products = respnse.product;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  onCategoryChange(event: any) {
    if (event?.target?.value) {
      if (event.target.value === 'Filter By Category') {
        this.getAllProducts();
      } else {
        this.getAllProductsByCategory(event.target.value);
      }
    }
  }

  onSortingChange(event: any) {
    if (event?.target?.value) {
      if (event.target.value === 'Choose...') return;
      if (event.target.value === 'Title') {
        this.products = this.products.sort((a, b) =>
          a.name < b.name ? -1 : 1
        );
      }
      if (event.target.value === 'Price ASC') {
        this.products.sort((a, b) => a.price - b.price);
      }

      if (event.target.value === 'Price DESC') {
        this.products.sort((a, b) => b.price - a.price);
      }

      if (event.target.value === 'Rating') {
        this.products = this.products.sort((a, b) =>
          a.name < b.name ? -1 : 1
        );
      }
    }
  }
}
