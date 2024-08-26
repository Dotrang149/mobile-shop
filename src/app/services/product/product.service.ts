import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  brandName: string;
  promotionName: string;
  
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:7189/api/Product'; // Assuming your API endpoint is at 'api/Product'

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/get-all-products`);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/get-by-id/${id}`);
  }

  createProduct(name: string, description: string, price: number, image: string, brandName: string, promotionName: string): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/create-product`, { name, description, price, image, brandName,promotionName });
  }

  updateProduct(product: Product): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update-product/${product.id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-product/${id}`);
  }

  /* getProductsByPaging(
     filter: string,
     sortBy: string,
     pageIndex: number,
     pageSize: number
   ): Observable<PaginatedProductResponse> {
     return this.http.get<PaginatedProductResponse>(
       `${this.apiUrl}/get-products-by-paging?filter=${filter}&sortBy=${sortBy}&pageIndex=${pageIndex}&pageSize=${pageSize}`
     );
   }*/
}