import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Libro } from '../../../../interfaces/libro';
import { BookTableComponent } from "../../tables/books/book-table/book-table.component";
import { BackendService } from '../../../../services/backend.service';
import { BookPopupComponent } from "../../../popups/book-popup/book-popup.component";
import { BackendResponse } from '../../../../interfaces/backend-response';
import { Error } from '../../../../interfaces/Error';
import { temporalStorage } from '../../../../classes/TemporalStorage';
import { ErrorPopupComponent } from '../../../popups/error-popup/error-popup.component';

@Component({
  selector: 'app-add-libro-form',
  imports: [BookTableComponent, BookPopupComponent],
  templateUrl: './add-libro-form.component.html',
  styleUrl: './add-libro-form.component.css'
})
export class AddLibroFormComponent implements OnInit {
  protected table_Header : string[] = [];
  protected table_Body : Libro[] = [];

  @ViewChild("tableRef")
  private tableRef! : BookTableComponent;
  private backendService : BackendService = inject(BackendService);

  @ViewChild("popupRef")
  private popupRef! : BookPopupComponent;

  private basePtr : number = 0;
  private showInPage : number = 25;
  private maxEntries : number = 0;

  protected stub_data : boolean[] = []; 
  protected $index : number = 1;

  constructor() {
    this.table_Header.push("ISBN");
    this.table_Header.push("Nombre Libro");
    this.table_Header.push("Autor");
    this.table_Header.push("Editorial");
    this.table_Header.push("Foto");
    this.table_Header.push("Fecha de Lanzamiento");
    this.table_Header.push("Precio");
    this.table_Header.push("Synopsis");
    this.table_Header.push("Stock");
    this.table_Header.push("");
    this.table_Header.push("");
  }

  ngOnInit(): void 
  {
    this.backendService.getLibros(this.showInPage).subscribe((books : Libro[]) => {
      this.table_Body = books;
      this.tableRef?.updateTable();
      this.maxEntries = books.length;
      this.stub_data = [];

      for(var x = 0; x < (this.maxEntries / this.showInPage); x++)
      {
        if(this.basePtr <= (this.showInPage * x) && this.basePtr > (this.maxEntries / x))
        {
          this.stub_data.push(true);
        }
        else
        {
          this.stub_data.push(false);
        }
      }
    })
  }

  success()
  {

  }

  onEditClick(libro : Libro)
  {
    this.popupRef.setLibro(libro, this);
    this.popupRef.showPopup();
  }

  onAddClick()
  {
    this.popupRef.setLibro({
      ISBN: '',
      Name: "",
      Author: 0,
      Publisher: 0,
      LaunchDate: new Date(),
      Price: 0,
      Synopsis: "",
      Image: "",
      Stock: 0
    }, this);
    this.popupRef.showPopup();
  }

  onDeleteClick(libro : Libro)
  {
    this.backendService.deleteLibro(libro).subscribe((rsp : BackendResponse<{ payload: Boolean } | Error>)=>{
      if(rsp.Success)
      {
        this.success();
      }
      else
      {
        const errorInstance = temporalStorage.getFromStorage<ErrorPopupComponent>("error_popup");
        const errorFunc = temporalStorage.getFromStorage<Function>("show_error_popup");

        errorFunc.call(errorInstance, (rsp.Data as Error));
      }
    })
  }

  libroUpdated(libro : Libro, oldBook : Libro)
  {
    if(oldBook.ISBN.length <= 0)
    {
      this.backendService.addLibro(libro).subscribe((rsp : BackendResponse<{ payload: Boolean } | Error>)=>{
        if(rsp.Success)
        {
          this.success();
        }
        else
        {
          const errorInstance = temporalStorage.getFromStorage<ErrorPopupComponent>("error_popup");
          const errorFunc = temporalStorage.getFromStorage<Function>("show_error_popup");
  
          errorFunc.call(errorInstance, (rsp.Data as Error));
        }
      });
    }
    else
    {
      this.backendService.updateLibro(oldBook?.ISBN, libro).subscribe((rsp : BackendResponse<{ payload: Boolean } | Error>)=>{
        if(rsp.Success)
        {
          this.success();
        }
        else
        {
          const errorInstance = temporalStorage.getFromStorage<ErrorPopupComponent>("error_popup");
          const errorFunc = temporalStorage.getFromStorage<Function>("show_error_popup");
  
          errorFunc.call(errorInstance, (rsp.Data as Error));
        }
      });
    }
  }
}
