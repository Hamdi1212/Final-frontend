import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {
  signupform!:FormGroup;
  constructor(private fb : FormBuilder , private auth : AuthService,private toast :ToastrService){}
  
  
    ngOnInit(): void {
      this.signupform=this.fb.group({
        FirstName:['',Validators.required],
        lastName:['',Validators.required],
        Email:['',Validators.required],
        phone:['',Validators.required],
        Departement:['',Validators.required],
        position : ['',Validators.required],
        Address : [''],
        HireDate : [''],
        Salary :[''],
        EmployeeStatus : [''],
        Skills : [''],
        certification : ['']
      })
      
    }
    onsubmit(){
      console.log(this.signupform);
      if(this.signupform.valid){
        //perform data for register
        console.log(this.signupform.value)
        this.auth.register(this.signupform.value)
        .subscribe({
          next:(res=>{
            this.toast.success("worker created")
          }),
          error:(err=>{
            this.toast.error("Error happned")
          })
        })
        console.log(this.signupform.value)
      }else{
        console.log("form is not valid")
      }
    }
}
