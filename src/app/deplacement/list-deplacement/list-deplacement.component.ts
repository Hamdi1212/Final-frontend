import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-list-deplacement',
  templateUrl: './list-deplacement.component.html',
  styleUrls: ['./list-deplacement.component.css']
})
export class ListDeplacementComponent implements OnInit {
  projets: any[] = [];

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.loadProjets();
  }

  loadProjets() {
    this.auth.getProjets().subscribe({
      next: (data) => {
        // The actual list is in data["$values"]
        if (data && data["$values"]) {
          this.projets = data["$values"];
        } else {
          this.projets = [];
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des projets', err);
        this.projets = [];
      }
    });
  }

  getLignes(projet: any): any[] {
    return projet.lignes && projet.lignes["$values"] ? projet.lignes["$values"] : [];
  }

  getPostes(ligne: any): any[] {
    return ligne.postes && ligne.postes["$values"] ? ligne.postes["$values"] : [];
  }
}