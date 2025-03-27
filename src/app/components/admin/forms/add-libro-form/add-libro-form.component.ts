import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Libro } from '../../../../interfaces/libro';
import { BookTableComponent } from "../../tables/books/book-table/book-table.component";
import { BackendService } from '../../../../services/backend.service';

@Component({
  selector: 'app-add-libro-form',
  imports: [BookTableComponent],
  templateUrl: './add-libro-form.component.html',
  styleUrl: './add-libro-form.component.css'
})
export class AddLibroFormComponent implements OnInit {
  protected table_Header : string[] = [];
  protected table_Body : Libro[] = [];

  @ViewChild("tableRef")
  private tableRef! : BookTableComponent;
  private backendService : BackendService = inject(BackendService);

  constructor() {
    this.table_Header.push("ISBN");
    this.table_Header.push("Nombre Libro");
    this.table_Header.push("Autor");
    this.table_Header.push("Editorial");
    this.table_Header.push("Foto");
    this.table_Header.push("Fecha de Lanzamiento");
    this.table_Header.push("Precio");
    this.table_Header.push("");
    this.table_Header.push("");

    
    this.backendService.getLibros(2).subscribe((books : Libro[]) => {
      this.table_Body = books;
      this.tableRef?.updateTable();
    })
  }

  ngOnInit(): void 
  {
    this.backendService.getLibros(2).subscribe((books : Libro[]) => {
      this.table_Body = books;
      this.tableRef?.updateTable();
    })
  }

}
