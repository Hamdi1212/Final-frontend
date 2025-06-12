import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  moveForm!: FormGroup;
  equipment: any;
  stores: any[] = [];
  projects: any[] = [];
  lignes: any[] = [];
  postes: any[] = [];
  message: string = '';
  isSubmitting: boolean = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private fb: FormBuilder
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.equipment = navigation?.extras?.state?.['equipment'];
  }

  ngOnInit(): void {
    if (!this.equipment) {
      this.router.navigate(['/equipement']);
      return;
    }

    this.moveForm = this.fb.group({
      storeId: [null],
      projetId: [null],
      ligneId: [null],
      posteId: [null]
    });

    // Populate stores and projects
    this.auth.getStores().subscribe((data: any) => {
      this.stores = Array.isArray(data) ? data : (data?.$values ?? []);
    });
    this.auth.getProjets().subscribe((data: any) => {
      this.projects = Array.isArray(data) ? data : (data?.$values ?? []);
    });

    // When project changes, fetch lignes
    this.moveForm.get('projetId')?.valueChanges.subscribe(projectId => {
      console.log('Projet selected:', projectId);
      if (projectId) {
        this.auth.getLigneById(projectId).subscribe((data: any) => {
          console.log('Ligne API raw data:', data);
          // Handle array, $values, or single object
          if (Array.isArray(data)) {
            this.lignes = data;
          } else if (data && Array.isArray(data.$values)) {
            this.lignes = data.$values;
          } else if (data && typeof data === 'object') {
            this.lignes = [data];
          } else {
            this.lignes = [];
          }
          console.log('Lignes to display:', this.lignes);
        });
      } else {
        this.lignes = [];
      }
      this.moveForm.patchValue({ ligneId: null, posteId: null });
      this.postes = [];
    });

    // When ligne changes, fetch postes
    this.moveForm.get('ligneId')?.valueChanges.subscribe(ligneId => {
      console.log('Ligne selected:', ligneId);
      if (ligneId) {
        this.auth.getPosteById(ligneId).subscribe((data: any) => {
          console.log('Poste API raw data:', data);
          if (Array.isArray(data)) {
            this.postes = data;
          } else if (data && Array.isArray(data.$values)) {
            this.postes = data.$values;
          } else if (data && typeof data === 'object') {
            this.postes = [data];
          } else {
            this.postes = [];
          }
          console.log('Postes to display:', this.postes);
        });
      } else {
        this.postes = [];
      }
      this.moveForm.patchValue({ posteId: null });
    });
  }

  onSubmit() {
    this.isSubmitting = true;
    this.message = '';
    const dto = {
      SerialNumber: this.equipment.serialNumber,
      StoreId: this.moveForm.value.storeId,
      ProjetId: this.moveForm.value.projetId,
      LigneId: this.moveForm.value.ligneId,
      PosteId: this.moveForm.value.posteId
    };
    this.auth.moveEquipement(dto).subscribe({
      next: () => {
        this.message = "Équipement déplacé avec succès !";
        this.isSubmitting = false;
        setTimeout(() => this.router.navigate(['/equipement']), 1200);
      },
      error: err => {
        this.message = err?.error || "Une erreur est survenue";
        this.isSubmitting = false;
      }
    });
  }
}