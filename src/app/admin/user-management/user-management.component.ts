import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {
  users = [
    // Danh sách người dùng sẽ được lấy từ server hoặc service
    { id: 1, name: 'Nguyen Van A', email: 'a@example.com', role: 'Admin' },
    { id: 2, name: 'Tran Van B', email: 'b@example.com', role: 'User' },
    // Thêm các người dùng khác tại đây
  ];

  currentPage = 1;
  itemsPerPage = 10;
  totalUsers = this.users.length;
  totalPages = Math.ceil(this.totalUsers / this.itemsPerPage);

  paginationArray = Array.from({length: this.totalPages}, (v, i) => i + 1);

  constructor() { }

  ngOnInit(): void { }

  onAddUser(): void {
    // Logic thêm người dùng
  }

  onEditUser(): void {
    // Logic sửa thông tin người dùng
  }

  onDeleteUser(userId: number): void {
    // Logic xóa người dùng
    this.users = this.users.filter(user => user.id !== userId);
    this.totalUsers = this.users.length;
    this.totalPages = Math.ceil(this.totalUsers / this.itemsPerPage);
    this.paginationArray = Array.from({length: this.totalPages}, (v, i) => i + 1);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.users.slice(start, end);
  }
}
