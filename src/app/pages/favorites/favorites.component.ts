import { Component, inject, OnInit } from '@angular/core';
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { GlowingTextComponent } from "../../components/text/glowing-text/glowing-text.component";
import { Libro } from '../../interfaces/libro';
import { LoadingComponent } from "../../components/loading/loading.component";
import { LoadingFieldComponent } from "../../components/loading-field/loading-field.component";
import { LibroEntryComponent } from "../../components/filter/libro-entry/libro-entry.component";
import { BackendService } from '../../services/backend.service';
import { ErrorPopupComponent } from '../../components/popups/error-popup/error-popup.component';
import { Error } from '../../interfaces/Error';

@Component({
  selector: 'app-favorites',
  imports: [TopbarComponent, FooterComponent, GlowingTextComponent, LoadingFieldComponent, LibroEntryComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {
  protected libros : Libro[] = [];
  protected index : number = 0;

  private backendService : BackendService = inject(BackendService);

  ngOnInit(): void {
    this.backendService.getFavorites().subscribe((rsp) => {
      if(rsp.Success)
      {
        this.libros = rsp.Data as Libro[];
      }
      else
      {
        ErrorPopupComponent.throwError(rsp.Data as Error);
      }
    })
  }

  onFavoritesRemoved(libro : Libro)
  {
    this.libros = this.libros.filter((_, i) => _ !== libro);
  }
}
