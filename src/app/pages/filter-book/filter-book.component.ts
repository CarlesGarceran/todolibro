import { Component } from '@angular/core';
import { TopbarComponent } from "../../topbar/topbar.component";
import { temporalStorage } from '../../classes/TemporalStorage';
import { Libro } from '../../interfaces/libro';
import { LoadingComponent } from "../../components/loading/loading.component";

@Component({
  selector: 'app-filter-book',
  imports: [TopbarComponent, LoadingComponent],
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
