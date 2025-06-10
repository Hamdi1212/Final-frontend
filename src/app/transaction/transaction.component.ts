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

    // Populate dropdowns (implement these methods in AuthService)
    this.auth.getStores().subscribe((data: any) => {
      this.stores = Array.isArray(data) ? data : (data?.$values ?? []);
    });
    this.auth.getProjets().subscribe((data: any) => {
      this.projects = Array.isArray(data) ? data : (data?.$values ?? []);
    });

    // When project changes, fetch lignes
    this.moveForm.get('projetId')?.valueChanges.subscribe(projectId => {
      if (projectId) {
        this.auth.getLigneById(projectId).subscribe((data: any) => {
          this.lignes = Array.isArray(data) ? data : (data?.$values ?? []);
        });
      } else {
        this.lignes = [];
      }
      this.moveForm.patchValue({ ligneId: null, posteId: null });
      this.postes = [];
    });

    // When ligne changes, fetch postes
    this.moveForm.get('ligneId')?.valueChanges.subscribe(ligneId => {
      if (ligneId) {
        this.auth.getPosteById(ligneId).subscribe((data: any) => {
          this.postes = Array.isArray(data) ? data : (data?.$values ?? []);
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