import { Component, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { Category } from '../../../../interfaces/category';
import { GenericTableComponent } from '../generic/generic-table/generic-table.component';
import { LoadingFieldComponent } from "../../../loading-field/loading-field.component";

@Component({
  selector: 'app-category-table',
  imports: [LoadingFieldComponent],
  templateUrl: './category-table.component.html',
  styleUrl: './category-table.component.css'
})
export class CategoryTableComponent extends GenericTableComponent<string, Category> implements OnInit, OnChanges {

  @Output("onEdit")
  public onEdit : EventEmitter<Category> = new EventEmitter<Category>();
  @Output("onDelete")
  public onDelete : EventEmitter<Category> = new EventEmitter<Category>();

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

  onDeleteFunc(category : Category): void
  {
    this.onDelete.emit(category);
  }

  onEditFunc(category : Category) : void
  {
    this.onEdit.emit(category);
  }
}
