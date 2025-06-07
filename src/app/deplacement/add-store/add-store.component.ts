import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.css']
})
export class AddStoreComponent {
  storeForm: FormGroup;
  message = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.storeForm = this.fb.group({
      Name: ['', Validators.required],
      SerialNumber: ['', Validators.required]
    });
  }

  addStore() {
    if (this.storeForm.valid) {
      this.auth.createStore(this.storeForm.value).subscribe({
        next: () => {
          this.message = 'Magasin ajouté !';
          this.storeForm.reset();
        },
        error: err => this.message = err.error || "Erreur lors de l'ajout du magasin"
      });
    }
  }
}