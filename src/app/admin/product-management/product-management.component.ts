import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product, ProductService } from '../../services/product/product.service';



@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css'
})
export class ProductManagementComponent {
  products: Product[] = [];
  currentProduct!: Product;
  newProduct: { name: string, description: string, price: number, image: string, brandName: string, promotionName: string } = { name: '', description: '', price: 0, image: '', brandName: '', promotionName: '' }

  constructor(private productService: ProductService) { }

  ngOnInit() {
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

  getProductById(productId: string): void {
    this.productService.getProductById(productId).subscribe(
      (product) => {
        this.currentProduct = product;
      },
      (error) => {
        console.error(error);

      }
    )
  }

  createProduct(name: string, description: string, price: number, image: string, brandName: string, promotionName: string): void {
    console.log(name, description, price, image, brandName, promotionName);

    this.productService.createProduct(name, description, price, image, brandName, promotionName).subscribe(
      () => {
        console.log('tạo thành công');
        this.getAllProducts();
      },
      (error) => {
        console.error(error);
        if (error.error && error.error.errors) {
          console.error('Chi tiết lỗi:', error.error.errors);
        }
      }

    );

  }

  deleteProduct(productId: string): void {
    this.productService.deleteProduct(productId).subscribe(
      () => {
        console.log('delete success');
        this.getAllProducts();
      },
      (error) => {
        console.error(error);
        if (error.error && error.error.errors) {
          console.error('Chi tiết lỗi:', error.error.errors);
        }
      }
    )
  }


  updateProduct() {
    console.log(this.currentProduct);
    this.productService.updateProduct(this.currentProduct).subscribe(
      () => {
        console.log('Update success');
        this.getAllProducts();
      },
      (error) => {
        console.error(error);
        if (error.error && error.error.errors) {
          console.error('Chi tiết lỗi:', error.error.errors);
        }
      }
    )

  }

  editProduct(productId: string): void {
    this.productService.getProductById(productId).subscribe(
      (product) => {
        this.currentProduct = product;
      },
      (error) => {
        console.error('Error fetching product:', error);
      }
    );
  }
}
