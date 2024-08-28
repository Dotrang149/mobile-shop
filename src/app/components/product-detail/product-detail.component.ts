import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { ReviewComponent } from '../../review/review.component';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, ReviewComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  productId: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productId = id;
        console.log('Product ID from URL:', this.productId);
        
        this.productService.getProductById(this.productId).subscribe(
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
  }
}
