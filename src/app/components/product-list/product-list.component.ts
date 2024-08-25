import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { PaginatedResult } from '../../page/PaginatedResult';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductDetailComponent, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  selectedProduct: Product | undefined;

  onSelectProduct(product: Product): void {
    this.router.navigate(['/product-detail', product.id]);
  }
  

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    console.log('Fetching all products...');
    this.productService.getProducts().subscribe(
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
