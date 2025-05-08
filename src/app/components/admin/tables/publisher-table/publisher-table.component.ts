import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Publisher } from '../../../../interfaces/publisher';
import { GenericTableComponent } from '../generic/generic-table/generic-table.component';
import { LoadingFieldComponent } from "../../../loading-field/loading-field.component";

@Component({
  selector: 'app-publisher-table',
  imports: [LoadingFieldComponent],
  templateUrl: './publisher-table.component.html',
  styleUrl: './publisher-table.component.css'
})
export class PublisherTableComponent extends GenericTableComponent<string, Publisher> implements OnInit, OnChanges {

  @Output("onEdit")
  public onEdit: EventEmitter<Publisher> = new EventEmitter<Publisher>();
  @Output("onDelete")
  public onDelete: EventEmitter<Publisher> = new EventEmitter<Publisher>();

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

  onDeleteFunc(publisher : Publisher): void
  {
    this.onDelete.emit(publisher);
  }

  onEditFunc(publisher : Publisher) : void
  {
    this.onEdit.emit(publisher);
  }

}
