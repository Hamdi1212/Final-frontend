import { Component, ElementRef, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-setting',
  templateUrl: './employee-setting.component.html',
  styleUrls: ['./employee-setting.component.css']
})
export class EmployeeSettingComponent {
  public form: FormGroup;
  private file: File | null = null;
  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    this.file = file;
  }

  constructor( private host: ElementRef<HTMLInputElement> ) { 
    this.form = new FormGroup({
      email: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required)
    });
}
submit(){

}
}
