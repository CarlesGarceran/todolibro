import { AfterViewInit, Component, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { GenericTableComponent } from '../generic/generic-table/generic-table.component';
import { LoadingComponent } from "../../../loading/loading.component";
import { LoadingFieldComponent } from "../../../loading-field/loading-field.component";
import { Author } from '../../../../interfaces/author';

@Component({
  selector: 'app-author-table',
  imports: [LoadingFieldComponent],
  templateUrl: './author-table.component.html',
  styleUrl: './author-table.component.css'
})
export class AuthorTableComponent extends GenericTableComponent<string, Author> implements OnInit, OnChanges {
  
  @Output("onEdit")
  public onEdit : EventEmitter<Author> = new EventEmitter<Author>();
  @Output("onDelete")
  public onDelete : EventEmitter<Author> = new EventEmitter<Author>();

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

  onDeleteFunc(libro : Libro): void
  {
    this.onDelete.emit(libro);
  }

  onEditFunc(libro : Libro) : void
  {
    this.onEdit.emit(libro);
  }
}
