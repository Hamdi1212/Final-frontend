import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detail-mvstk-equipement',
  templateUrl: './detail-mvstk-equipement.component.html',
  styleUrls: ['./detail-mvstk-equipement.component.css']
})
export class DetailMvstkEquipementComponent {
@Input()transactions : any
}
