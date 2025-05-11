import { Component, inject, ViewChild } from '@angular/core';
import { Category } from '../../../../interfaces/category';
import { BackendService } from '../../../../services/backend.service';
import { LoggingService } from '../../../../services/logging.service';
import { ErrorPopupComponent } from '../../../popups/error-popup/error-popup.component';
import { CategorizedBook } from '../../../../interfaces/categorized-book';
import { Error } from '../../../../interfaces/Error';
import { CategorizeTableComponent } from "../../tables/categorize-table/categorize-table.component";
import { GlowingTextComponent } from "../../../text/glowing-text/glowing-text.component";
import { CategorizePopupComponent } from '../../../popups/categorize-popup/categorize-popup.component';

@Component({
  selector: 'app-categorize-form',
  imports: [CategorizeTableComponent, GlowingTextComponent, CategorizePopupComponent],
  templateUrl: './categorize-form.component.html',
  styleUrl: './categorize-form.component.css'
})
export class CategorizeFormComponent {
    protected table_Header: string[] = [];
    protected table_Body: CategorizedBook[] = [];
  
  
    @ViewChild("popupRef")
    private popupRef!: CategorizePopupComponent;
    @ViewChild("tableRef")
    private tableRef!: CategorizeTableComponent;
    private backendService: BackendService = inject(BackendService);
    private LoggingService: LoggingService = inject(LoggingService);
  
    constructor() {
      this.table_Header.push("ISBN");
      this.table_Header.push("Categorias");
      this.table_Header.push("");
    }
  
    ngOnInit(): void {
      this.backendService.getCategorizedBooks().subscribe(rsp => {
        if (rsp.Success) {
          this.table_Body = rsp.Data as CategorizedBook[];
          this.tableRef?.updateTable();
        }
      });
    }
  
    success(arg: string) {
      return this.LoggingService.logToServer(`The user has ${arg}`).subscribe((rsp) => { });
    }
  
    onEditClick(event: CategorizedBook) {
      this.popupRef.setCategorizedBook(event, this);
      this.popupRef.showPopup();
    }
  
    updateCategories(categorized: CategorizedBook) {
     this.backendService.categorizeBook(categorized).subscribe(rsp => {
          if (rsp.Success) {
            this.success(`updated the categories of ${categorized.isbn}`)
          }
          else {
            ErrorPopupComponent.throwError(rsp.Data as Error);
          }
      });
    }
}
