import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-nouvel-category',
  templateUrl: './nouvel-category.component.html',
  styleUrls: ['./nouvel-category.component.css']
})
export class NouvelCategoryComponent {

  categoryForm! : FormGroup;

  constructor (private ne: FormBuilder,private auth : AuthService , private datePipe: DatePipe,private router: Router){}


  ngOnInit(): void {
    this.categoryForm = this.ne.group({
      Description: ['', Validators.required],
      Code: ['', Validators.required],
      Date: [this.datePipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required]
    });

    
  }
  onSubmit() {
    if(this.categoryForm.valid){
      this.auth.AddCategory(this.categoryForm.value)
      .subscribe({
        error:(err=>{
          alert(err?.error.message)
        })
      })
    }else{
      console.log("data is not valid")
    }
    this.goBack();
  }
  
onCancel() {
  this.goBack();
  this.categoryForm.reset(); // Reset the form
}
goBack(){
  this.router.navigate(['/Categories']);
}

exportToExcel() {
  const data = [this.categoryForm.value]; // or your actual data array
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
  saveAs(blob, 'category_data.xlsx');
}

importFromExcel(event: any) {
  const file = event.target.files[0];
  const fileReader = new FileReader();
  fileReader.onload = (e: any) => {
    const arrayBuffer = e.target.result;
    const data = new Uint8Array(arrayBuffer);
    const arr = [];
    for (let i = 0; i !== data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    const bstr = arr.join('');
    const workbook = XLSX.read(bstr, {type: 'binary'});
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {raw: true});
    
    // Handle the imported data (jsonData)
    console.log(jsonData);
    // You might want to update your form with this data
  };
  fileReader.readAsArrayBuffer(file);
}
}
