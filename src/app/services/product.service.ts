import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define an interface for the product
export interface Product {
  id: number;
  name: string;
  price: number;
  // Add other product fields as necessary
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly APIUrl = 'https://localhost:7189/api/products'; 

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.APIUrl);
  }
}
