import { Component, inject, ViewChild } from '@angular/core';
import { Publisher } from '../../../../interfaces/publisher';
import { BackendService } from '../../../../services/backend.service';
import { LoggingService } from '../../../../services/logging.service';
import { PublisherTableComponent } from '../../tables/publisher-table/publisher-table.component';
import { GlowingTextComponent } from "../../../text/glowing-text/glowing-text.component";

@Component({
  selector: 'app-add-publisher-form',
  imports: [PublisherTableComponent, GlowingTextComponent],
  templateUrl: './add-publisher-form.component.html',
  styleUrl: './add-publisher-form.component.css'
})
export class AddPublisherFormComponent {
  protected table_Header : string[] = [];
  protected table_Body : Publisher[] = [];


  @ViewChild("tableRef")
  private tableRef! : PublisherTableComponent;
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
