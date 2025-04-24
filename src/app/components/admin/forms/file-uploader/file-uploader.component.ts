import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { BackendService } from '../../../../services/backend.service';
import { ErrorPopupComponent } from '../../../popups/error-popup/error-popup.component';
import { Error } from '../../../../interfaces/Error';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-file-uploader',
  imports: [FormsModule],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.css'
})
export class FileUploaderComponent {
  public file : File | null = null;
  public fieldNotEntered = false;
  public defaultPath : string = "uploads/";

  private backendService : BackendService = inject(BackendService);

  onFileSelected(event : any)
  {
    this.file = event.target.files[0];
  }

  onSubmit()
  {
    if(this.file == null)
    {
      this.fieldNotEntered = true;
      return;
    }
    
    this.fieldNotEntered = false;
    
    this.backendService.uploadFile(this.file, `?admin=true&path=${this.defaultPath}`).subscribe((rsp) => {
      if(rsp.Success)
      {
        const response = (rsp.Data as { fileName : string });
        console.log(response.fileName);
      }
      else
      {
        ErrorPopupComponent.throwError(rsp.Data as Error);
      }
    });
  }
}
