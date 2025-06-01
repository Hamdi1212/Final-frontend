import { Component,OnInit } from '@angular/core';
import{FormBuilder,FormGroup,Validators}from'@angular/forms'
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

signupform!:FormGroup;
constructor(private fb : FormBuilder , private auth : AuthService,private toast :ToastrService){}


  ngOnInit(): void {
    this.signupform=this.fb.group({

      Name:['',Validators.required],
      lastName:['',Validators.required],
      UserName:['',Validators.required],
      Email:['',Validators.required],
      phonenumber:['',Validators.required],
      Password:['',Validators.required],
      Role : ['',Validators.required]
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
          this.toast.success("user registred")
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
