import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StoreService } from '../services/store.service';
import { publishFacade } from '@angular/compiler';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  users : any
  public fullName : string ="";
  public role : string = "";
  constructor(private auth : AuthService,private store :StoreService ){}
  ngOnInit(): void {
    this.auth.getUsers().subscribe(
        data => {this.users = data});
        this.store.getFullNameFromStore().subscribe(
          val => {
            let FullName = this.auth.getFullNameFromToken();
           // this.store.setFullNameFromStore(FullName);
            this.fullName = FullName ||val;
          }
        )
        this.store.getRoleFromStore().subscribe(
          val => {
            let Role = this.store.getRoleFromStore().subscribe(
                val => {
                  let Role = this.auth.getRoleFromToken();
                  //this.store.setRoleFromStore(Role);
                  this.role = Role || val
                }
            )
          }
        );
        
    }
  

  
}
