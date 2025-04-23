import { Component, inject, ViewChild } from '@angular/core';
import { AuthorTableComponent } from "../../tables/author-table/author-table.component";
import { BackendService } from '../../../../services/backend.service';
import { LoggingService } from '../../../../services/logging.service';
import { Author } from '../../../../interfaces/author';
import { temporalStorage } from '../../../../classes/TemporalStorage';
import { ErrorPopupComponent } from '../../../popups/error-popup/error-popup.component';
import { BackendResponse } from '../../../../interfaces/backend-response';
import { Error } from '../../../../interfaces/Error';
import { GlowingTextComponent } from "../../../text/glowing-text/glowing-text.component";

@Component({
  selector: 'app-add-author-form',
  imports: [AuthorTableComponent, GlowingTextComponent],
  templateUrl: './add-author-form.component.html',
  styleUrl: './add-author-form.component.css'
})
export class AddAuthorFormComponent {
  protected table_Header : string[] = [];
  protected table_Body : Libro[] = [];

  @ViewChild("tableRef")
  private tableRef! : AuthorTableComponent;
  private backendService : BackendService = inject(BackendService);
  private LoggingService : LoggingService = inject(LoggingService);


  onAddClick()
  {
    
  }

  onEditClick(event : any)
  {

  }

  onDeleteClick(event : any)
  {

  }
}
