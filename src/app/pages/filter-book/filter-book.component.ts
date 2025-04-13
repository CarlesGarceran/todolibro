import { Component } from '@angular/core';
import { TopbarComponent } from "../../topbar/topbar.component";
import { temporalStorage } from '../../classes/TemporalStorage';
import { Libro } from '../../interfaces/libro';
import { LoadingComponent } from "../../components/loading/loading.component";
import { LibroEntryComponent } from "../../components/filter/libro-entry/libro-entry.component";

@Component({
  selector: 'app-filter-book',
  imports: [TopbarComponent, LoadingComponent, LibroEntryComponent],
  templateUrl: './filter-book.component.html',
  styleUrl: './filter-book.component.css'
})
export class FilterBookComponent {
  
  protected libros? : Libro[] = [];

  constructor() {
    this.libros = temporalStorage.getFromStorage<Libro[]>("bookData");

    this.libros?.forEach((libro : Libro) => {
      console.log(libro);
    });

    temporalStorage.releaseFromMemory("bookData");
  }
}
