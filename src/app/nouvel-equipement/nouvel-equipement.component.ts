import { Component,Input, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Equipement } from './equipementadd.component';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nouvel-equipement',
  templateUrl: './nouvel-equipement.component.html',
  styleUrls: ['./nouvel-equipement.component.css'] ,
  providers: [DatePipe] 
})
export class NouvelEquipementComponent implements OnInit {

  equipementForm! : FormGroup;
  public listCategory : any
  constructor (private ne: FormBuilder,private auth : AuthService , private datePipe: DatePipe,private router: Router){}


  ngOnInit(): void {
    this.auth.getCategory().subscribe( (data:any) => {
      this.listCategory = data;
    })
    this.equipementForm = this.ne.group({
      Description: ['', Validators.required],
      SerialNumber: ['', Validators.required],
      Input: [this.datePipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required],
      Etat: ['', Validators.required],
      Category : ['',Validators.required],
      Marque : ['']
    });

    
  }
  onSubmit() {
    console.log(this.equipementForm)
    if(this.equipementForm.valid){
      console.log(this.equipementForm.value)
      this.auth.PostAction(this.equipementForm.value)
      .subscribe({
        next:(res=>{
          alert(res.message)
        }),
        error:(err=>{
          alert(err?.error.message)
        })
      })
    }else{
      console.log("data is not valid")
    }
    this.goBack();
  }
  
onCancel() {
  this.equipementForm.reset();
  this.goBack(); // Reset the form
}
goBack(){
  this.router.navigate(['/equipement']);
}

}
