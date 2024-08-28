import { Component, OnInit, Input } from '@angular/core';
import { ReviewService, Review } from '../services/review/review.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']  // Corrected to `styleUrls`
})
export class ReviewComponent implements OnInit {
  reviews: Review[] = [];
  reviewForm!: FormGroup;
  @Input() productId!: string;  
  userId: string | undefined;
  editingReview: Review | null = null; // Track the review being edited

  constructor(
    private fb: FormBuilder,
    private reviewService: ReviewService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getCurrentUser()?.id;
    this.initializeForm();
    this.loadReviews();
  }

  initializeForm(): void {
    this.reviewForm = this.fb.group({
      comment: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  loadReviews(): void {
    if (this.productId) {
      this.reviewService.getReviewsByProduct(this.productId).subscribe(
        (reviews) => {
          this.reviews = reviews;
        },
        (error) => {
          console.error('Error fetching reviews:', error);
        }
      );
    } else {
      console.warn('Product ID is not defined.');
    }
  }

  addReview(): void {
    if (this.reviewForm.invalid || !this.userId || !this.productId) {
      console.warn('Form is invalid:', this.reviewForm.invalid);
      console.warn('User ID:', this.userId);
      console.warn('Product ID:', this.productId);
      return;
    }
  
    const review: Review = {
      comment: this.reviewForm.value.comment,
      userId: this.userId,
      productId: this.productId
    };
  
    if (this.editingReview) {
      this.updateReview(this.editingReview, review.comment);
    } else {
      this.reviewService.addComment(review).subscribe(
        () => {
          this.loadReviews();
          this.reviewForm.reset();
        },
        (error) => {
          console.error('Error adding review:', error);
        }
      );
    }
  }

  editReview(review: Review): void {
    this.editingReview = review;
    this.reviewForm.setValue({
      comment: review.comment
    });
  }

  updateReview(review: Review, newComment: string): void {
    this.reviewService.updateComment(review.userId, review.productId, newComment).subscribe(
      () => {
        this.loadReviews();
        this.reviewForm.reset();
        this.editingReview = null;
      },
      (error) => {
        console.error('Error updating review:', error);
      }
    );
  }

  deleteReview(review: Review): void {
    this.reviewService.deleteComment(review.userId, review.productId).subscribe(
      () => this.loadReviews(),
      (error) => {
        console.error('Error deleting review:', error);
      }
    );
  }

  cancelEdit(): void {
    this.editingReview = null;
    this.reviewForm.reset();
  }
}

