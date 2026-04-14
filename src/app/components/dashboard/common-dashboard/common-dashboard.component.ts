import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoleDTO } from 'src/app/models/role-dto';
import { CommonDashboardService } from 'src/app/services/dashboard/common-dashboard.service';

@Component({
  selector: 'app-common-dashboard',
  templateUrl: './common-dashboard.component.html',
  styleUrls: ['./common-dashboard.component.css']
})
export class CommonDashboardComponent {
  
  roles: RoleDTO[] = [];
  isLoading: boolean = true;
  constructor(private router: Router, private userDashBoardService: CommonDashboardService) {}
  
  ngOnInit(): void {
    this.userDashBoardService.getRoles().subscribe({
      next: (data) => {
        this.roles = data.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 403 || err.status === 401) {
          this.router.navigate(['']);
        } else {
          console.error('Failed to fetch roles', err);
        }
    }
    });
    
  }

  getRoleStatus(roleName: string): string | null {
    const role = this.roles.find(r => r.role === roleName);
    return role ? role.status : null;
  }

  goToStoreManagerPortal(): void {
    const storeManagerStatus = this.getRoleStatus('STOREMANAGER');
    if (storeManagerStatus === 'ACTIVE') {
      this.router.navigate(['/store/dashboard']);
      return;
    }

    if (storeManagerStatus === 'NOT_ASSIGNED') {
      this.router.navigate(['/store/apply']);
    }
  }

  // if the code returned is 403 forbidden then dont show these cards
  goToPortal(portal: string) {

    if (portal === 'STORE') {
      this.router.navigate(['/store-register']);
    }

    if (portal === 'WAREHOUSE') {
      this.router.navigate(['/warehouse-register']);
    }

    if (portal === 'ADMIN') {
      this.router.navigate(['/admin-dashboard']);
    }
  }
}
