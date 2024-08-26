import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { User, UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {
  users: User[] = [];
  currentUser!: User;
  newUser: { userName: string, email: string, password: string, phoneNumber: number, role: string } = { userName: '', email: '', password: '', phoneNumber: 0, role: '' };
  newRole: { roleName: string, roleDescription: string } = { roleName: '', roleDescription: '' };

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(): void {
    console.log('Fetching all users...');
    this.userService.getAllUsers().subscribe(
      (data: any) => {
        console.log('Raw data fetched:', data);
        if (data && data.$values) {
          this.users = data.$values; // Truy cập vào mảng $values chứa người dùng
          console.log('Users fetched:', this.users);
        } else {
          console.error('Invalid data format:', data);
        }
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  getUserById(userId: string): void {
    this.userService.getUserById(userId).subscribe(
      (user) => {
        this.currentUser = user;
      },
      (error) => {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
      }
    );
  }

  createUser(userName: string, email: string, password: string, phoneNumber: number, role: string): void {
    console.log(userName, email, password, role);

    if (!this.newUser.userName || !this.newUser.email || !this.newUser.password) {
      console.error('Dữ liệu người dùng chưa đầy đủ');
      return;
    }

    this.userService.createUser(userName, email, password, phoneNumber, role).subscribe(
      () => {
        console.log('Tạo người dùng thành công');
        this.loadUsers(); // Cập nhật danh sách người dùng nếu cần
      },
      (error) => {
        console.error('Lỗi khi tạo người dùng:', error);
        // Thêm log để xem chi tiết lỗi
        if (error.error && error.error.errors) {
          console.error('Chi tiết lỗi:', error.error.errors);
        }
      }
    );
  }

  assignRole(userId: string, roleName: string) {
    this.userService.assignRole(userId, roleName).subscribe(
      () => {
        console.log('Gán vai trò thành công');
      },
      (error) => {
        console.error('Lỗi khi gán vai trò:', error);
      }
    );
  }

  removeRole(userId: string, roleName: string) {
    this.userService.removeRole(userId, roleName).subscribe(
      () => {
        console.log('Xóa vai trò thành công');
      },
      (error) => {
        console.error('Lỗi khi xóa vai trò:', error);
      }
    );
  }

  createRole() {
    console.log(this.newRole);

    this.userService.createRole(this.newRole.roleName, this.newRole.roleDescription).subscribe(
      () => {
        console.log('Tạo vai trò thành công');
      },
      (error) => {
        console.error('Lỗi khi tạo vai trò:', error);
      }
    );
  }

  deleteRole(roleName: string): void {
    console.log(roleName);
    console.log(this.newRole.roleName);


    this.userService.deleteRole(roleName).subscribe(
      () => {
        console.log('Xóa vai trò thành công');
      },
      (error) => {
        console.error('Lỗi khi xóa vai trò:', error);
      }
    );
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe(
      () => {
        console.log('Xóa người dùng thành công');
        this.loadUsers();
      },
      (error) => {
        console.error('Lỗi khi xóa người dùng:', error);
      }
    );
  }

  updateUser() {
    console.log(this.currentUser);
    this.userService.updateUser(this.currentUser).subscribe(
      () => {
        console.log('Cập nhật người dùng thành công');
        this.loadUsers();
      },
      (error) => {
        console.error('Lỗi khi cập nhật người dùng:', error);
      }
    );
  }
}
