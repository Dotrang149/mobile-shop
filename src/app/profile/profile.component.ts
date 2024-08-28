import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const userId = this.getCurrentUserId();
    console.log('Current User ID:', userId);
    if (userId) {
      this.userService.getUserById(userId).subscribe(data => {
        this.user = data;
      }, error => {
        console.error('Error fetching user data', error);
        console.log(localStorage.getItem('loginResult'));
      });
      

    } else {
      console.error('No user ID found in local storage');
      console.log(localStorage.getItem('loginResult'));
    }
  }
  getCurrentUserId(): string | undefined {
    const loginResultJSON = localStorage.getItem('loginResult');
    const loginResult = loginResultJSON ? JSON.parse(loginResultJSON) : undefined;
    return loginResult ? loginResult.id : undefined;
  }

  // getCurrentUserId(): string | undefined {
  //   // Lấy login result từ localStorage
  //   const loginResultJSON = localStorage.getItem('loginResult');
  //   const loginResult = loginResultJSON ? JSON.parse(loginResultJSON) : undefined;
  
  //   if (loginResult && loginResult.token) {
  //     try {
  //       // Giải mã phần payload của JWT
  //       const token = loginResult.token;
  //       const payload = token.split('.')[1];
  //       const decodedPayload = JSON.parse(atob(payload));
  
  //       console.log('Decoded JWT Payload:', decodedPayload);
  
  //       // Trả về userId từ payload (có thể là thuộc tính 'sub' hoặc 'nameidentifier')
  //       return decodedPayload.nameidentifier || decodedPayload.sub;
  //     } catch (error) {
  //       console.error('Error decoding JWT:', error);
  //       return undefined;
  //     }
  //   }
  //   return undefined;
  // }
  
  
}
