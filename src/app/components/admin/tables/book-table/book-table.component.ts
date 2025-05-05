import { AfterViewInit, Component, EventEmitter, inject, OnChanges, OnInit, Output } from '@angular/core';
import { GenericTableComponent } from '../generic/generic-table/generic-table.component';
import { Libro } from '../../../../interfaces/libro';
import { LoadingComponent } from "../../../loading/loading.component";
import { LoadingFieldComponent } from "../../../loading-field/loading-field.component";
import { CacheStorage } from '../../../../classes/CacheStorage';
import { BackendService } from '../../../../services/backend.service';
import { Publisher } from '../../../../interfaces/publisher';
import { Author } from '../../../../interfaces/author';

@Component({
  selector: 'app-book-table',
  imports: [LoadingFieldComponent],
  templateUrl: './book-table.component.html',
  styleUrl: './book-table.component.css'
})
export class BookTableComponent extends GenericTableComponent<string, Libro> implements OnInit, OnChanges {
  
  @Output("onEdit")
  public onEdit : EventEmitter<Libro> = new EventEmitter<Libro>();
  @Output("onDelete")
  public onDelete : EventEmitter<Libro> = new EventEmitter<Libro>();

  protected authorCacheStorage : CacheStorage = new CacheStorage();
  protected publisherCacheStorage : CacheStorage = new CacheStorage();

  private backendService : BackendService = inject(BackendService);

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

  getOrSavePublisherName(publisherId : number) : string
  {
    if(this.publisherCacheStorage.getFromCache<string>(publisherId.toString()))
      return this.publisherCacheStorage.getFromCache(publisherId.toString());
    else
    {
      this.backendService.getPublisher(publisherId).subscribe((rsp) => {
        if(rsp.Success)
        {
          this.publisherCacheStorage.addToCache(publisherId.toString(), (rsp.Data as Publisher).Name);
        }
      })
    }

    return "";
  }

  getOrSaveAuthorName(authorId : number) : string
  {
    if(this.authorCacheStorage.getFromCache<string>(authorId.toString()))
      return this.authorCacheStorage.getFromCache(authorId.toString());
    else
    {
      this.backendService.getAuthor(authorId).subscribe((rsp) => {
        if(rsp.Success)
        {
          this.authorCacheStorage.addToCache(authorId.toString(), (rsp.Data as Author).Name);
        }
      })
    }

    return "";
  }
}
