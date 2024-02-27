import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Products } from '../products';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productForm!: FormGroup;
  loading: boolean = false;
  deleteloading: boolean = false;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private modelServce: NgbModal
  ) {}

  products: Products[] = [];

  ngOnInit(): void {
    this.getAllProducts();
    this.initializeForm();
  }

  initializeForm() {
    this.productForm = this.fb.group({
      id: [0],
      name: ['', Validators.compose([Validators.required])],
      category: ['', Validators.compose([Validators.required])],
      rating: ['none', Validators.compose([Validators.required])],
      price: [0, Validators.compose([Validators.required])],
    });
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (respnse) => {
        this.products = respnse.product;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  onSubmit() {
    if (this.productForm.value.id != 0) {
      this.updatedProduct();
    } else {
      this.createProduct();
    }
  }

  createProduct() {
    this.loading = true;
    this.productService.createProduct(this.productForm.value).subscribe({
      next: (respnse) => {
        this.products.push(...respnse.product);
        this.modelServce.dismissAll();
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

  updatedProduct() {
    this.loading = true;
    this.productService.updateProductByID(this.productForm.value).subscribe({
      next: (respnse) => {
        this.products = this.products.map((obj) =>
          obj.id === this.productForm.value.id ? { ...respnse.product[0] } : obj
        );
        this.modelServce.dismissAll();
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

  deleteProduct(id: number) {
    this.deleteloading = true;
    this.productService.deleteProduct(id).subscribe({
      next: (respnse) => {
        this.products = this.products.filter((obj) => obj.id !== id);
        this.modelServce.dismissAll();
      },
      error: (err) => {
        console.log(err);
        this.deleteloading = false;
      },
      complete: () => {
        this.deleteloading = false;
      },
    });
  }

  open(content: any) {
    this.modelServce.open(content);
  }

  edit(product: Products, content: any) {
    this.productForm.patchValue({
      id: product.id,
      name: product.name,
      category: product.category,
      rating: product.rating,
      price: product.price,
    });

    this.modelServce.open(content);
  }
}
