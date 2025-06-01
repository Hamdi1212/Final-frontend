import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent  implements OnInit{
  single: any[] =  [];
  single1: any[] =  [];
  single2: any[] =  [];
  view :[number,number]=[700, 400];
  multi: any[] = [];
  view1: any[] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Employees';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Number of Employees';
  legendTitle: string = 'Years';

  colorScheme: Color = { 
    domain: ['#5AA454', '#C7B42C', '#AAAAAA'],
    group: ScaleType.Ordinal, 
    selectable: true, 
    name: 'Customer Usage', 
  }

  constructor(private authService: AuthService){}
  ngOnInit(): void {
    this.authService.getStat().subscribe(data =>{
      this.single = data
    })
    this.authService.getStat1().subscribe(data =>{
      this.single1 = data
    })
    this.authService.getStat2().subscribe(data =>{
      this.single2 = data
    })
  }
  // options

  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below


  colorScheme1: Color = { 
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA','#00008B','#74BBFB'], 
    group: ScaleType.Ordinal, 
    selectable: true, 
    name: 'Customer Usage', 
};



}
