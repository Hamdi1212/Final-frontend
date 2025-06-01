import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ThisReceiver } from '@angular/compiler';
import { StoreService } from '../services/store.service';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.Scss']
})
export class EmployeesComponent implements OnInit {
  role : string = '';
  employeesList : any
  constructor(private authService: AuthService,private store :StoreService,private toast :ToastrService ){
  }
  ngOnInit(){
    this.store.getRoleFromStore().subscribe(data => {
      this.role =data;
     });
     this.getUsersByRole();
     
  }
  deleteUser(matricule : string){
    this.authService.deleteAdminEmployee(matricule).subscribe(
      {
        next :(res) => { this.toast.success('deleted successfully');
        this.getUsersByRole();
        },
        error :(err) => {this.toast.error('error happened')}
      }
    ); 
  }
  getUsersByRole()
  {
    switch(this.role){
      case 'ADMIN':
        this.authService.getAdminEmployee().subscribe((data : any) =>{
          this.employeesList=data ;
        });
        break;
      case 'RH':
        this.authService.getUsers().subscribe((data : any) =>{
          this.employeesList=data ;
        }); 
        break;
     }
  }
}
