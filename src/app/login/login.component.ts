import { Component,OnInit } from '@angular/core';
import{FormBuilder,FormGroup,Validators}from'@angular/forms'
import { AuthService } from '../services/auth.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{


loginForm!:FormGroup;
  toastr: any;
  constructor(private fb: FormBuilder ,private auth :AuthService,private route : Router,private toast :ToastrService,
    private userStore :StoreService){}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
     name:['',Validators.required],
      password:['',Validators.required]
    })
  }
  onlogin(){
    if (this.loginForm.valid) {

      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {

        
          this.auth.storeToken(res.token);
          let payload =this.auth.decodeToken();
          this.userStore.setFullNameFromStore(payload.name);
          this.userStore.setRoleFromStore(payload.role);
          switch(payload.role){
            case 'RH':
            this.route.navigate(['/Employees']);
            break;
            case 'Teck':
              this.route.navigate(['/equipement']);
              break;
            case 'ADMIN':
              this.route.navigate(['/statistiques'])  
              break;
          }
          this.toast.success("login succeed")
           // Show success toast
        },
        error: (err) => {
          this.toast.error("login failed"); // Show error toast
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }
}
