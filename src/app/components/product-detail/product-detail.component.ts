import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

interface Review {
  reviewerName: string;
  rating: number;
  comment: string;
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  reviews: Review[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      console.log('Product ID from URL:', productId);
      if (productId) {
        this.productService.getProductById(productId).subscribe(
          (product: Product) => {
            console.log('Fetched product:', product); 
            this.product = product;
          },
          (error) => {
            console.error('Error fetching product details:', error);
          }
        );
      }
    });

     // Giả lập dữ liệu đánh giá
   this.reviews = [
    { reviewerName: 'Nguyễn Văn A', rating: 5, comment: 'Sản phẩm rất tốt!' },
    { reviewerName: 'Trần Thị B', rating: 4, comment: 'Chất lượng ổn, giá hơi cao.' },
    { reviewerName: 'Phạm Văn C', rating: 3, comment: 'Sản phẩm dùng ổn, giao hàng chậm.' }
  ];
  }
}
