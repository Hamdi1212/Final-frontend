import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-app-file-upload',
  templateUrl: './app-file-upload.component.html',
  styleUrls: ['./app-file-upload.component.css']
})
export class AppFileUploadComponent {

  private file: File | null = null;
  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    this.file = file;
  }

  constructor( private host: ElementRef<HTMLInputElement> ) {}
}
