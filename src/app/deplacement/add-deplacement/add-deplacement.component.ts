import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-deplacement',
  templateUrl: './add-deplacement.component.html',
  styleUrls: ['./add-deplacement.component.css']
})
export class AddDeplacementComponent {
  projetForm: FormGroup;
  ligneForm: FormGroup;
  posteForm: FormGroup;
  message = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.projetForm = this.fb.group({
      ProjetNom: ['', Validators.required],
      LigneNom: ['', Validators.required],
      PosteNom: ['', Validators.required]
    });
    this.ligneForm = this.fb.group({
      LigneNom: ['', Validators.required],
      ProjectId: ['', Validators.required]
    });
    this.posteForm = this.fb.group({
      PosteNom: ['', Validators.required],
      LigneId: ['', Validators.required]
    });
  }

  addProjet() {
    if (this.projetForm.valid) {
      this.auth.createProjet(this.projetForm.value).subscribe({
        next: () => {
          this.message = 'Projet (avec ligne et poste) ajouté !';
          this.projetForm.reset();
        },
        error: err => this.message = err.error || "Erreur lors de l'ajout du projet"
      });
    }
  }

  addLigne() {
    if (this.ligneForm.valid) {
      this.auth.createLigne(this.ligneForm.value).subscribe({
        next: () => {
          this.message = 'Ligne ajoutée !';
          this.ligneForm.reset();
        },
        error: err => this.message = err.error || "Erreur lors de l'ajout de la ligne"
      });
    }
  }

  addPoste() {
    if (this.posteForm.valid) {
      this.auth.createPoste(this.posteForm.value).subscribe({
        next: () => {
          this.message = 'Poste ajouté !';
          this.posteForm.reset();
        },
        error: err => this.message = err.error || "Erreur lors de l'ajout du poste"
      });
    }
  }
}