import { AfterViewInit, Component, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { GenericTableComponent } from '../../generic/generic-table/generic-table.component';
import { Libro } from '../../../../../interfaces/libro';
import { LoadingComponent } from "../../../../loading/loading.component";

@Component({
  selector: 'app-book-table',
  imports: [LoadingComponent],
  templateUrl: './book-table.component.html',
  styleUrl: './book-table.component.css'
})
export class BookTableComponent extends GenericTableComponent<string, Libro> implements OnInit, OnChanges {
  
  @Output("onEdit")
  public onEdit : EventEmitter<Libro> = new EventEmitter<Libro>();

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
  
  onEditFunc(libro : Libro) : void
  {
    this.onEdit.emit(libro);
  }
}
