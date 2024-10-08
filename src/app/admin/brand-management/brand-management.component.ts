import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Brand, BrandService } from '../../services/brand/brand.service';

@Component({
  selector: 'app-brand-management',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './brand-management.component.html',
  styleUrl: './brand-management.component.css'
})
export class BrandManagementComponent {
  brands: Brand[] = [];
  currentBrand!: Brand;
  newBrand: { name: string, description: string } = { name: '', description: '' };

  constructor(private brandService: BrandService) { }

  ngOnInit() {
    this.getAllBrands();
  }

  getAllBrands(): void {
    console.log('Fetching all brands...');
    this.brandService.getAllBrands().subscribe(
      (data: any) => {
        console.log('Raw data fetched:', data);
        if (data && data.$values) {
          this.brands = data.$values; // Gán dữ liệu trực tiếp vào mảng brands
          console.log('Brands fetched:', this.brands);
        } else {
          console.error('Invalid data format:', data);
        }
      },
      (error) => {
        console.error('Error fetching brands:', error);
      }
    );
  }

  getBrandById(brandId: string): void {
    this.brandService.getBrandById(brandId).subscribe(
      (brand) => {
        this.currentBrand = brand;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  createBrand(name: string, description: string): void {
    console.log(name, description);

    this.brandService.createBrand( name, description ).subscribe(
      () => {
        console.log('Brand created successfully');
        this.getAllBrands();
      },
      (error) => {
        console.error(error);
        if (error.error && error.error.errors) {
          console.error('Error details:', error.error.errors);
        }
      }
    );
  }

  updateBrand(): void {
    console.log(this.currentBrand);
    this.brandService.updateBrand(this.currentBrand).subscribe(
      () => {
        console.log('Brand updated successfully');
        this.getAllBrands();
      },
      (error) => {
        console.error(error);
        if (error.error && error.error.errors) {
          console.error('Error details:', error.error.errors);
        }
      }
    );
  }

  deleteBrand(brandId: string): void {
    this.brandService.deleteBrand(brandId).subscribe(
      () => {
        console.log('Brand deleted successfully');
        this.getAllBrands();
      },
      (error) => {
        console.error(error);
        if (error.error && error.error.errors) {
          console.error('Error details:', error.error.errors);
        }
      }
    );
  }
}