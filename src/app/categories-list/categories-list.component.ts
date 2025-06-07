import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  categories: any[] = [];
  equipmentCounts: { [code: string]: number } = {};

  constructor(
    private service: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.getCategory().subscribe((data: any) => {
      this.categories = Array.isArray(data) ? data : (data?.$values || []);
      this.categories.forEach(category => {
        this.service.getEquipementByCategoryCode(category.code).subscribe(
          (equipments: any[]) => {
            this.equipmentCounts[category.code] = Array.isArray(equipments) ? equipments.length : 0;
          },
          (error) => {
            if (error.status === 404) {
              this.equipmentCounts[category.code] = 0;
            }
          }
        );
      });
    });
  }

  selectCategory(category: any) {
    this.router.navigate(['/equipementDetails'], {
      state: { selectedCategory: category },  // Passing data via navigation state
    });
  }
}