import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string = "";

  constructor(
    private userStore: StoreService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userStore.getFullNameFromStore().subscribe(name => {
      this.userName = name;
    });
  }

  logout() {
    this.auth.logout();
    this.userStore.setFullNameFromStore(""); // Clear username in the store
    this.router.navigate(['/login']);
  }
}