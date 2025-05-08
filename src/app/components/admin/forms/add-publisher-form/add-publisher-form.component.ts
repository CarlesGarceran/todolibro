import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Publisher } from '../../../../interfaces/publisher';
import { BackendService } from '../../../../services/backend.service';
import { LoggingService } from '../../../../services/logging.service';
import { PublisherTableComponent } from '../../tables/publisher-table/publisher-table.component';
import { GlowingTextComponent } from "../../../text/glowing-text/glowing-text.component";
import { PublisherPopupComponent } from '../../../popups/publisher-popup/publisher-popup.component';
import { ErrorPopupComponent } from '../../../popups/error-popup/error-popup.component';
import { Error } from '../../../../interfaces/Error';

@Component({
  selector: 'app-add-publisher-form',
  imports: [PublisherTableComponent, GlowingTextComponent, PublisherPopupComponent],
  templateUrl: './add-publisher-form.component.html',
  styleUrl: './add-publisher-form.component.css'
})
export class AddPublisherFormComponent implements OnInit {
  protected table_Header: string[] = [];
  protected table_Body: Publisher[] = [];


  @ViewChild("popupRef")
  private popupRef!: PublisherPopupComponent;
  @ViewChild("tableRef")
  private tableRef!: PublisherTableComponent;
  private backendService: BackendService = inject(BackendService);
  private LoggingService: LoggingService = inject(LoggingService);

  constructor() {
    this.table_Header.push("Id Editorial");
    this.table_Header.push("Nombre Editorial");
    this.table_Header.push("Imagen");
    this.table_Header.push("");
    this.table_Header.push("");
  }

  ngOnInit(): void {
    this.backendService.getPublishers().subscribe(rsp => {
      if (rsp.Success) {
        this.table_Body = rsp.Data as Publisher[];
        this.tableRef?.updateTable();
      }
    });
  }

  success(arg: string) {
    return this.LoggingService.logToServer(`The user has ${arg}`).subscribe((rsp) => { });
  }

  onAddClick() {
    this.popupRef.setPublisher({ PublisherId: -1, Image: '', Name: '' }, this);
    this.popupRef.showPopup();
  }

  onEditClick(event: Publisher) {
    this.popupRef.setPublisher(event, this);
    this.popupRef.showPopup();
  }

  onDeleteClick(event: Publisher) {
    this.backendService.deletePublisher(event.PublisherId).subscribe((rsp) => {
      if (rsp.Success) {
        this.success(`deleted the publisher ${event.Name}`).add(() => { window.location.reload(); });
      }
      else {
        ErrorPopupComponent.throwError(rsp.Data as Error);
      }
    })
  }

  publisherUpdated(publisher: Publisher, oldPublisher: Publisher) {
    if (oldPublisher.PublisherId == -1) {
      this.backendService.addPublisher(publisher).subscribe(rsp => {
        if (rsp.Success) {
          this.success(`added the publisher ${publisher.Name}`)
        }
        else {
          ErrorPopupComponent.throwError(rsp.Data as Error);
        }
      });
    }
    else {
      this.backendService.updatePublisher(oldPublisher.PublisherId, publisher).subscribe(rsp => {
        if (rsp.Success) {
          this.success(`updated the publisher ${oldPublisher.Name}`)
        }
        else {
          ErrorPopupComponent.throwError(rsp.Data as Error);
        }
      });
    }
  }
}
