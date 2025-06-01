import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  public listCategory : any
  constructor(private service : AuthService){}

  ngOnInit(){
    this.service.getCategory().subscribe( (data:any) => {
      this.listCategory = data;
    })
  }
}
