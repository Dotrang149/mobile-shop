import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { PaginatedResult } from '../../page/PaginatedResult';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    console.log('Fetching all products...');
    this.productService.getAllProducts().subscribe(
      (data: any) => {
        console.log('Raw data fetched:', data);
        if (data && data.$values) {
          this.products = data.$values; // Truy cập vào mảng $values chứa sản phẩm
          console.log('Products fetched:', this.products);
        } else {
          console.error('Invalid data format:', data);
        }
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
