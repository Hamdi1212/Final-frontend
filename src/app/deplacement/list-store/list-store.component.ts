import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-list-store',
  templateUrl: './list-store.component.html',
  styleUrls: ['./list-store.component.css']
})
export class ListStoreComponent implements OnInit {
  stores: any[] = [];

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.loadStores();
  }

  loadStores() {
    this.auth.getStores().subscribe({
      next: (data) => {
        this.stores = (data && data["$values"]) ? data["$values"] : [];
      },
      error: (err) => {
        console.error('Erreur lors du chargement des magasins', err);
        this.stores = [];
      }
    });
  }
}