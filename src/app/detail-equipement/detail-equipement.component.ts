import { Component,OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-detail-equipement',
  templateUrl: './detail-equipement.component.html',
  styleUrls: ['./detail-equipement.component.css']
})
export class DetailEquipementComponent implements OnInit {
  get_all_equipement: any[] = [];

  constructor(private authService: AuthService){}
  ngOnInit(): void {
    this.getaction();
  }

  getaction():void {
    this.authService.getAction()
      .subscribe((data: any) => {
        // Use the correct case-sensitive property name!
        this.get_all_equipement = Array.isArray(data.EquipementDetails) ? data.EquipementDetails : [];
      });
  }

  delete(serialNumber: string) {
    this.authService.deleteEquipement(serialNumber).subscribe(
      data => {
        this.getaction();
      }
    );
  }
}