import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { HttpHeaders } from '@angular/common/http';

export interface Review {
  comment: string;
  userId: string;
  productId: string;
}

@Injectable({
  providedIn: 'root'
})

export class ReviewService {
  private baseUrl = 'https://localhost:7189/api/Review';

  constructor(private http: HttpClient, private authService: AuthService) { }

  // private getAuthHeaders(): HttpHeaders {
  //   const token = this.authService.getAccessToken(); 
  //   return new HttpHeaders({
  //     'Authorization': `Bearer ${token}`,
  //     'Content-Type': 'application/json'
  //   });
  // }


  getReviewsByProduct(productId: string, pageIndex: number = 1, pageSize: number = 10): Observable<Review[]> {
    const params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<Review[]>(`${this.baseUrl}/get-by-productid/${productId}`, { params });
  }

  getReviewsByUser(userId: string, pageIndex: number = 1, pageSize: number = 10): Observable<Review[]> {
    const params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<Review[]>(`${this.baseUrl}/get-by-userid/${userId}`, { params });
  }

  addComment(review: Review): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add-comment`, review
    //   , {
    //   // headers: this.getAuthHeaders()
    // }
  );
  }

  updateComment(userId: string, productId: string, newComment: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/update-comment/${userId}/${productId}`, { comment: newComment }
    //   , {
    //   // headers: this.getAuthHeaders()
    // }
  );
  }

  deleteComment(userId: string, productId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete-comment/${userId}/${productId}`
    //   , {
    //   headers: this.getAuthHeaders()
    // }
  );
  }
}


