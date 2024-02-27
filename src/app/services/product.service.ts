import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  URL = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {}

  createProduct(body: any): Observable<any> {
    return this.http.post(`${this.URL}products`, body);
  }

  getAllProducts(): Observable<any> {
    return this.http.get(`${this.URL}products`);
  }

  getProductByID(id: number): Observable<any> {
    return this.http.get(`${this.URL}products/${id}`);
  }

  getProductByCategory(category: string): Observable<any> {
    return this.http.get(`${this.URL}products/category/${category}`);
  }

  updateProductByID(body: any): Observable<any> {
    return this.http.put(`${this.URL}products/${body.id}`, body);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.URL}products/${id}`);
  }
}
