import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService, LoginUser } from '../services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  showPassword = false;

  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username:['', Validators.required],
      password:['', Validators.required]
    })
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    console.log('Form submitted');
  
    if (this.loginForm.valid) {
      const loginData : LoginUser = this.loginForm.value as LoginUser;
      console.log("Form submitted", loginData)
      this.auth.login(loginData).subscribe({
        next:(res)=>{
          if (res && res.message) {
            alert(res.message);
          } else {
            alert("Login successful, but no message was returned from the server.");
          }
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
    }else{
      this.validateAllFormFilled(this.loginForm);
      alert("Your form is invalid");
    }
  }

  private validateAllFormFilled(formGroup : FormGroup) {
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl) {
        control.markAsDirty({onlySelf:true});
      } else if(control instanceof FormGroup) {
        this.validateAllFormFilled(control)
      }
    })
  }
}
