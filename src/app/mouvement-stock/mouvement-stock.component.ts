import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-mouvement-stock',
  templateUrl: './mouvement-stock.component.html',
  styleUrls: ['./mouvement-stock.component.css']
})
export class MouvementStockComponent implements OnInit {
  transactionsList: any[] = [];
  constructor(private authService:AuthService){
    this.authService.getTransaction().subscribe(data =>
      {
        this.transactionsList = data;
      }
    )
  }

  ngOnInit(): void {
    
  }


}
