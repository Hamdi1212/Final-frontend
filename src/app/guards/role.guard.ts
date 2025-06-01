import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StoreService } from '../services/store.service';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(
    private store: StoreService,
    private router: Router,
    private toast: ToastrService
  ) {}
  canActivate(): Observable<boolean> {
    return this.store.getRoleFromStore().pipe(
      map(role => {
        if (role === 'ADMIN') {
          return true;
        } else {
          this.toast.error('Access denied - Admins only');
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}