import { Component, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { GenericTableComponent } from '../generic/generic-table/generic-table.component';
import { CategorizedBook } from '../../../../interfaces/categorized-book';
import { LoadingFieldComponent } from "../../../loading-field/loading-field.component";

@Component({
  selector: 'app-categorize-table',
  imports: [LoadingFieldComponent],
  templateUrl: './categorize-table.component.html',
  styleUrl: './categorize-table.component.css'
})
export class CategorizeTableComponent extends GenericTableComponent<string, CategorizedBook> implements OnInit, OnChanges {
  @Output("onEdit")
  public onEdit: EventEmitter<CategorizedBook> = new EventEmitter<CategorizedBook>();
  @Output("onDelete")
  public onDelete: EventEmitter<CategorizedBook> = new EventEmitter<CategorizedBook>();

  constructor() {
      super();
    }
  
    ngOnInit(): void 
    {
      this.header = this.h_Data;
      this.table_data = this.b_Data;
    }
  
    ngOnChanges(): void 
    {  
      this.header = this.h_Data;
      this.table_data = this.b_Data;
    }
  
    updateTable() : void
    {
      this.header = this.h_Data;
      this.table_data = this.b_Data;
    }
  
    onDeleteFunc(category : CategorizedBook): void
    {
      this.onDelete.emit(category);
    }
  
    onEditFunc(category : CategorizedBook) : void
    {
      this.onEdit.emit(category);
    }
}
