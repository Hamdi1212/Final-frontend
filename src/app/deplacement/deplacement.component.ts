import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-deplacement',
  templateUrl: './deplacement.component.html',
  styleUrls: ['./deplacement.component.css']
})
export class DeplacementComponent implements OnInit {
  projets: any[] = [];
  lignes: any[] = [];
  postes: any[] = [];
  stores: any[] = [];

  projetForm: FormGroup;
  ligneForm: FormGroup;
  posteForm: FormGroup;
  storeForm: FormGroup;

  message = '';

  constructor(private auth: AuthService, private fb: FormBuilder) {
    this.projetForm = this.fb.group({
      ProjetNom: ['', Validators.required],
      LigneNom: ['', Validators.required],
      PosteNom: ['', Validators.required],
    });
    this.ligneForm = this.fb.group({
      LigneNom: ['', Validators.required],
      ProjectId: ['', Validators.required],
    });
    this.posteForm = this.fb.group({
      PosteNom: ['', Validators.required],
      LigneId: ['', Validators.required]
    });
    this.storeForm = this.fb.group({
      Name: ['', Validators.required],
      SerialNumber: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.loadProjets();
    this.loadLignes();
    this.loadPostes();
    this.loadStores();
  }

  // -------- Projets ---------
  loadProjets() {
    this.auth.getProjets().subscribe(data => {
      console.log('Projets:', data);
      // Accepts [array], {result: [array]}, or defaults to []
      if (Array.isArray(data)) {
        this.projets = data.map(projet => ({
          ...projet,
          lignes: Array.isArray(projet.lignes) ? projet.lignes : []
        }));
      } else if (data && Array.isArray(data.result)) {
        this.projets = data.result.map((projet: any) => ({
          ...projet,
          lignes: Array.isArray(projet.lignes) ? projet.lignes : []
        }));
      } else {
        this.projets = [];
      }
    });
  }
  addProjet() {
    if (this.projetForm.valid) {
      this.auth.createProjet(this.projetForm.value).subscribe({
        next: () => {
          this.message = 'Projet ajouté !';
          this.projetForm.reset();
          this.loadProjets();
        },
        error: () => this.message = "Erreur lors de l'ajout du projet"
      });
    }
  }
  deleteProjet(id: number) {
    if (confirm('Supprimer ce projet ?')) {
      this.auth.deleteProjet(id).subscribe({
        next: () => { this.message = 'Projet supprimé !'; this.loadProjets(); }
      });
    }
  }

  // -------- Lignes ---------
  loadLignes() {
    this.auth.getLignes().subscribe(data => {
      console.log('Lignes:', data);
      if (Array.isArray(data)) {
        this.lignes = data.map(ligne => ({
          ...ligne,
          postes: Array.isArray(ligne.postes) ? ligne.postes : []
        }));
      } else if (data && Array.isArray(data.result)) {
        this.lignes = data.result.map((ligne: any) => ({
          ...ligne,
          postes: Array.isArray(ligne.postes) ? ligne.postes : []
        }));
      } else {
        this.lignes = [];
      }
    });
  }
  addLigne() {
    if (this.ligneForm.valid) {
      this.auth.createLigne(this.ligneForm.value).subscribe({
        next: () => {
          this.message = 'Ligne ajoutée !';
          this.ligneForm.reset();
          this.loadLignes();
        },
        error: () => this.message = "Erreur lors de l'ajout de la ligne"
      });
    }
  }
  deleteLigne(id: number) {
    if (confirm('Supprimer cette ligne ?')) {
      this.auth.deleteLigne(id).subscribe({
        next: () => { this.message = 'Ligne supprimée !'; this.loadLignes(); }
      });
    }
  }

  // -------- Postes ---------
  loadPostes() {
    this.auth.getPostes().subscribe(data => {
      console.log('Postes:', data);
      if (Array.isArray(data)) {
        this.postes = data;
      } else if (data && Array.isArray(data.result)) {
        this.postes = data.result;
      } else {
        this.postes = [];
      }
    });
  }
  addPoste() {
    if (this.posteForm.valid) {
      this.auth.createPoste(this.posteForm.value).subscribe({
        next: () => {
          this.message = 'Poste ajouté !';
          this.posteForm.reset();
          this.loadPostes();
        },
        error: () => this.message = "Erreur lors de l'ajout du poste"
      });
    }
  }
  deletePoste(id: number) {
    if (confirm('Supprimer ce poste ?')) {
      this.auth.deletePoste(id).subscribe({
        next: () => { this.message = 'Poste supprimé !'; this.loadPostes(); }
      });
    }
  }

  // -------- Stores ---------
  loadStores() {
    this.auth.getStores().subscribe(data => {
      console.log('Stores:', data);
      if (Array.isArray(data)) {
        this.stores = data;
      } else if (data && Array.isArray(data.result)) {
        this.stores = data.result;
      } else {
        this.stores = [];
      }
    });
  }
  addStore() {
    if (this.storeForm.valid) {
      this.auth.createStore(this.storeForm.value).subscribe({
        next: () => {
          this.message = 'Magasin ajouté !';
          this.storeForm.reset();
          this.loadStores();
        },
        error: () => this.message = "Erreur lors de l'ajout du magasin"
      });
    }
  }
}