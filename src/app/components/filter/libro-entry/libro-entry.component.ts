import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Libro } from '../../../interfaces/libro';
import { Router, RouterLink } from '@angular/router';
import { BackendService } from '../../../services/backend.service';
import { ErrorPopupComponent } from '../../popups/error-popup/error-popup.component';
import { Error } from '../../../interfaces/Error';
import { InfoPopupComponent } from '../../popups/info-popup/info-popup.component';
import { AppStarRatingComponent } from "../../app-star-rating/app-star-rating.component";
import { Publisher } from '../../../interfaces/publisher';
import { Author } from '../../../interfaces/author';

@Component({
  selector: 'app-libro-entry',
  imports: [RouterLink, AppStarRatingComponent],
  templateUrl: './libro-entry.component.html',
  styleUrl: './libro-entry.component.css'
})
export class LibroEntryComponent implements OnInit {
  @Input()
  public libro?: Libro;
  @Input()
  public synopsisMaxCharacters: number = 120;
  @Input()
  public showFavoriteButton: boolean = true;
  @Output()
  public onFavoritesAdded: EventEmitter<any> = new EventEmitter();
  @Output()
  public onFavoritesRemoved: EventEmitter<any> = new EventEmitter();

  protected Rating: number = 0;
  protected Author?: Author;
  protected Publisher?: Publisher;

  private router: Router = inject(Router);
  private backendService: BackendService = inject(BackendService);

  public forwardLink() {

  }

  ngOnInit(): void {
    if (this.libro != null) {
      this.backendService.getRating(this.libro.ISBN).subscribe((rsp) => {
        if (rsp.Success) {
          var rating = (rsp.Data as { rating: number }).rating;;
          if (rating == null)
            rating = 0;

          this.Rating = rating;
        }
      });

      this.backendService.getAuthor(this.libro.Author).subscribe((rsp) => {
        if (rsp.Success) {
          this.Author = (rsp.Data as Author);
        }
      });

      this.backendService.getPublisher(this.libro.Publisher).subscribe((pub) => {
        if (pub.Success) {
          this.Publisher = pub.Data as Publisher;
        }
      });

      this.backendService.getFavorites().subscribe((rsp) => {
        if(rsp.Success)
        {
          var favorites = rsp.Data as Libro[];

          this.showFavoriteButton = (favorites.findIndex(rsp => rsp.ISBN == this.libro?.ISBN) == -1);
        }
      })
    }
  }

  public getTrimmedSynopsis(): string {
    if (this.libro == null)
      return "";

    if (this.libro?.Synopsis.length <= this.synopsisMaxCharacters)
      return this.libro.Synopsis;
    else
      return this.libro.Synopsis.substring(0, this.synopsisMaxCharacters) + "...";
  }


  addToFavorites() {
    if (this.libro != null) {
      this.backendService.addToFavorites(this.libro).subscribe((rsp) => {
        if (!rsp.Success) {
          ErrorPopupComponent.throwError(rsp.Data as Error);
        }
        else {
          InfoPopupComponent.throwInfo({ error_code: 0, message: "Se añadio el libro a la lista de favoritos." }, "Añadido a favoritos");
          this.onFavoritesAdded.emit(null);
          this.showFavoriteButton = false;
        }
      });
    }
  }

  removeFromFavorites() {
    if (this.libro != null) {
      this.backendService.deleteFromFavorites(this.libro).subscribe((rsp) => {
        if (!rsp.Success) {
          ErrorPopupComponent.throwError(rsp.Data as Error);
        }
        else {
          InfoPopupComponent.throwInfo({ error_code: 0, message: "Se elimino el libro a la lista de favoritos." }, "Eliminado de favoritos");
          this.onFavoritesRemoved.emit(null);
          this.showFavoriteButton = true;
        }
      });
    }
  }
}
