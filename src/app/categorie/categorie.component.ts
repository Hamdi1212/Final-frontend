import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  public listCategory: any[] = [];

  constructor(private service: AuthService, private router: Router) {}

  ngOnInit() {
    this.fetchCategories();

    // Refetch categories whenever navigating to /Categories
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd &&
          (event as NavigationEnd).urlAfterRedirects.endsWith('/Categories'))
      )
      .subscribe(() => {
        this.fetchCategories();
      });
  }

  fetchCategories() {
    this.service.getCategory().subscribe((data: any) => {
      this.listCategory = data?.$values || [];
    });
  }
}