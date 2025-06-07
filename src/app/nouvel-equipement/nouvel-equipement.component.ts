import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nouvel-equipement',
  templateUrl: './nouvel-equipement.component.html',
  styleUrls: ['./nouvel-equipement.component.css'],
  providers: [DatePipe]
})
export class NouvelEquipementComponent implements OnInit {

  equipementForm!: FormGroup;
  public listCategory: any[] = [];
  public listStore: any[] = [];

  constructor(
    private ne: FormBuilder,
    private auth: AuthService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.getCategory().subscribe((data: any) => {
      this.listCategory = data?.$values ?? [];
    });

    this.auth.getStores().subscribe((data: any) => {
      this.listStore = data?.$values ?? [];
    });

    this.equipementForm = this.ne.group({
      Description: ['', Validators.required],
      SerialNumber: ['', Validators.required],
      Input: [this.datePipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required],
      Etat: ['', Validators.required], // will be 0 or 1
      Category: ['', Validators.required], // category code (string, not id)
      Marque: [''],
      Store: ['', Validators.required]     // storeId
    });
  }

  onSubmit() {
    if (this.equipementForm.valid) {
      const form = this.equipementForm.value;
      const payload = {
        Description: form.Description,
        SerialNumber: form.SerialNumber,
        Input: form.Input,
        Etat: form.Etat,
        Marque: form.Marque,
        category: form.Category, // <--- THIS IS IMPORTANT!
        StoreId: form.Store
      };
      console.log('Payload:', payload);

      this.auth.PostAction(payload)
        .subscribe({
          next: (res => {
            alert(res.message);
            this.goBack();
          }),
          error: (err => {
            console.log('Error:', err.error);
            alert(err?.error?.message || JSON.stringify(err.error) || "Erreur lors de l'enregistrement !");
          })
        });
    } else {
      console.log("data is not valid");
    }
  }

  onCancel() {
    this.equipementForm.reset();
    this.goBack();
  }

  goBack() {
    this.router.navigate(['/equipement']);
  }
}