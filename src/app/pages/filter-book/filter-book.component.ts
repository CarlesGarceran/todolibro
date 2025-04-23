import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TopbarComponent } from "../../components/topbar/topbar.component";;
import { temporalStorage } from '../../classes/TemporalStorage';
import { Libro } from '../../interfaces/libro';
import { LoadingComponent } from "../../components/loading/loading.component";
import { LibroEntryComponent } from "../../components/filter/libro-entry/libro-entry.component";
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { BackendResponse } from '../../interfaces/backend-response';
import { Error } from '../../interfaces/Error';
import { ErrorPopupComponent } from '../../components/popups/error-popup/error-popup.component';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-filter-book',
  imports: [TopbarComponent, LoadingComponent, LibroEntryComponent, FooterComponent],
  templateUrl: './filter-book.component.html',
  styleUrl: './filter-book.component.css'
})
export class FilterBookComponent implements OnInit 
{
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router : Router = inject(Router);
  private backendService: BackendService = inject(BackendService);
  public libros: Libro[] = [];

  constructor() {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((rsp) => {
      const filterType = rsp['filter_type'] || "";
      const filterName = rsp['filter_arg'] || "";

      this.readQuery(filterType, filterName);
    });
  }

  readQuery(filterType: string, filterName: string) {
    this.backendService.getLibrosByFilter(filterType, filterName).subscribe((result: BackendResponse<any>) => {
      if (result.Success) {
        const libros: Libro[] = result.Data;

        if (libros.length == 0) {
          var error: Error = {
            error_code: 400,
            message: "No se han encontrado libros con las caracteristicas introducidas"
          };

          const errComponent = temporalStorage.getFromStorage<ErrorPopupComponent>("error_popup");
          errComponent.setError(error);
          errComponent.showPopup();
          return;
        }

        if (libros.length <= 1) {
          this.router.navigate(['/book/', libros[0].ISBN]);
        }
        else {
          this.libros = libros;
        }
      }
      else {
        var error: Error = result.Data;

        const errComponent = temporalStorage.getFromStorage<Function>("show_error_popup");
        errComponent.call(temporalStorage.getFromStorage("error_popup"), error);
      }
    });
  }
}
