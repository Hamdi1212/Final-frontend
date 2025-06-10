import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-equipement',
  templateUrl: './equipement.component.html',
  styleUrls: ['./equipement.component.css']
})
export class EquipementComponent implements OnInit {
  selectedCategory: any;
  equipementList: any[] = [];
  filteredEquipment: any[] = [];
  searchTerm: string = '';
  noEquipementMessage: string = '';

  constructor(private router: Router, private auth: AuthService) {
    const navigation = this.router.getCurrentNavigation();
    this.selectedCategory = navigation?.extras?.state?.['selectedCategory'];
  }

ngOnInit(): void {
  console.log('Selected category:', this.selectedCategory);

  if (this.selectedCategory?.code) {
    this.auth.getEquipementByCategoryCode(this.selectedCategory.code).subscribe(
      x => {
        // Extract array from $values if response is wrapped
        const equipArray = Array.isArray(x) ? x : (x?.$values ?? []);
        console.log('Equipement fetched (final array):', equipArray);
        this.equipementList = equipArray;
        this.filteredEquipment = [...this.equipementList];
        this.noEquipementMessage = this.equipementList.length === 0
          ? "No equipment found for the selected category."
          : '';
      },
      error => {
        this.equipementList = [];
        this.filteredEquipment = [];
        this.noEquipementMessage = "An error occurred while fetching equipment.";
      }
    );
  }
}

  addEquipment() {
    this.router.navigate(['nouvel-equipement']);
  }
  moveEquipment(item: any) {
  this.router.navigate(['/transaction'], { state: { equipment: item } });
}

  filterEquipment() {
    if (!this.searchTerm) {
      this.filteredEquipment = [...this.equipementList];
      return;
    }
    const term = this.searchTerm.toLowerCase();
    this.filteredEquipment = this.equipementList.filter(item => 
      (item.description && item.description.toLowerCase().includes(term)) ||
      (item.serialNumber && item.serialNumber.toLowerCase().includes(term)) ||
      (item.marque && item.marque.toLowerCase().includes(term)) ||
      (item.category && item.category.toLowerCase().includes(term))
    );
  }

  exportToExcel() {
    const data = this.filteredEquipment; // or this.equipementList for all items
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'Equipment': worksheet }, SheetNames: ['Equipment'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    saveAs(blob, 'equipment_list.xlsx');
  }

  importFromExcel(event: any) {
    const file = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = (e: any) => {
      const arrayBuffer = e.target.result;
      const data = new Uint8Array(arrayBuffer);
      const arr = [];
      for (let i = 0; i < data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });

      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });

      this.auth.insertEquipement(jsonData).subscribe();
    };

    fileReader.readAsArrayBuffer(file);
  }
}