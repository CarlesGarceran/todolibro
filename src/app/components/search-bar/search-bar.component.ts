import { Component, inject } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { FormsModule } from '@angular/forms';
import { Libro } from '../../interfaces/libro';
import { BackendResponse } from '../../interfaces/backend-response';
import { Router } from '@angular/router';
import { Error } from '../../interfaces/Error';
import { temporalStorage } from '../../classes/TemporalStorage';
import { ErrorPopupComponent } from '../popups/error-popup/error-popup.component';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  public inputText: string = "";
  public selectFilter: string = "Nombre";

  private router: Router = inject(Router);
  private backendService: BackendService = inject(BackendService);

  search() {
    this.backendService.getLibrosByFilter(this.selectFilter, this.inputText).subscribe((result: BackendResponse<any>) => {
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
          temporalStorage.addToStorage("bookData", libros);
          this.router.navigate(['/filter']);
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
