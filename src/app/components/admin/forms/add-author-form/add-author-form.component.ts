import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { AuthorTableComponent } from "../../tables/author-table/author-table.component";
import { BackendService } from '../../../../services/backend.service';
import { LoggingService } from '../../../../services/logging.service';
import { Author } from '../../../../interfaces/author';
import { ErrorPopupComponent } from '../../../popups/error-popup/error-popup.component';
import { Error } from '../../../../interfaces/Error';
import { GlowingTextComponent } from "../../../text/glowing-text/glowing-text.component";
import { AuthorPopupComponent } from "../../../popups/author-popup/author-popup.component";

@Component({
  selector: 'app-add-author-form',
  imports: [AuthorTableComponent, GlowingTextComponent, AuthorPopupComponent],
  templateUrl: './add-author-form.component.html',
  styleUrl: './add-author-form.component.css'
})
export class AddAuthorFormComponent implements OnInit {
  protected table_Header: string[] = [];
  protected table_Body: Author[] = [];

  @ViewChild("tableRef")
  private tableRef!: AuthorTableComponent;
  @ViewChild("popupRef")
  private popupRef!: AuthorPopupComponent;
  private backendService: BackendService = inject(BackendService);
  private LoggingService: LoggingService = inject(LoggingService);

  protected stub_data: boolean[] = [];
  protected $index: number = 1;

  constructor() {
    this.table_Header.push("Id Autor");
    this.table_Header.push("Nombre Autor");
    this.table_Header.push("Imagen");
    this.table_Header.push("");
    this.table_Header.push("");
  }

  ngOnInit(): void {
    this.backendService.getAuthors().subscribe(rsp => {
      if (rsp.Success) {
        this.table_Body = rsp.Data as Author[];
        this.tableRef?.updateTable();

      }
    });
  }

  success(arg: string) {
    return this.LoggingService.logToServer(`The user has ${arg}`).subscribe((rsp) => { });
  }

  onAddClick() {
    this.popupRef.setAuthor({ AuthorId: -1, Image: '', Name: '' }, this);
    this.popupRef.showPopup();
  }

  onEditClick(event: Author) {
    this.popupRef.setAuthor(event, this);
    this.popupRef.showPopup();
  }

  onDeleteClick(event: Author) {
    this.backendService.deleteAuthor(event.AuthorId).subscribe((rsp) => {
      if (rsp.Success) {
        this.success(`deleted the author ${event.Name}`).add(() => { window.location.reload(); });
      }
      else {
        ErrorPopupComponent.throwError(rsp.Data as Error);
      }
    })
  }

  authorUpdated(author: Author, oldAuthor: Author) {
    if (oldAuthor.AuthorId == -1) {
      this.backendService.addAuthor(author).subscribe(rsp => {
        if (rsp.Success) {
          this.success(`added the author ${author.Name}`)
        }
        else {
          ErrorPopupComponent.throwError(rsp.Data as Error);
        }
      });
    }
    else {
      this.backendService.updateAuthor(oldAuthor.AuthorId, author).subscribe(rsp => {
        if (rsp.Success) {
          this.success(`updated the author ${oldAuthor.Name}`)
        }
        else {
          ErrorPopupComponent.throwError(rsp.Data as Error);
        }
      });
    }
  }
}
