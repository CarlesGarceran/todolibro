import { Component, inject, Input, OnInit } from '@angular/core';
import { Libro } from '../../../interfaces/libro';
import { Author } from '../../../interfaces/author';
import { BackendService } from '../../../services/backend.service';
import { Publisher } from '../../../interfaces/publisher';
import { RouterLink } from '@angular/router';
import { BackendResponse } from '../../../interfaces/backend-response';
import { Error } from '../../../interfaces/Error';
import { temporalStorage } from '../../../classes/TemporalStorage';
import { AppStarRatingComponent } from "../../app-star-rating/app-star-rating.component";


@Component({
  selector: 'app-carousel-book-item',
  imports: [RouterLink, AppStarRatingComponent],
  templateUrl: './carousel-book-item.component.html',
  styleUrl: './carousel-book-item.component.css'
})
export class CarouselBookItemComponent implements OnInit {
  @Input("Item")
  public inputItem?: Libro;
  protected Author?: Author;
  protected Publisher?: Publisher;

  protected Rating: number = 0;

  private backendService: BackendService = inject(BackendService);

  constructor() {

  }

  ngOnInit(): void {
    if (this.inputItem != null) {
      this.backendService.getAuthor(this.inputItem.Author).subscribe((rsp) => {
        if (rsp.Success) {
          this.Author = (rsp.Data as Author);
        }
      });

      this.backendService.getRating(this.inputItem.ISBN).subscribe((rsp) => {
        if (rsp.Success) {
          var rating = (rsp.Data as { rating: number }).rating;;
          if (rating == null)
            rating = 0;

          this.Rating = rating;
        }
      });

      this.backendService.getPublisher(this.inputItem.Publisher).subscribe((pub: BackendResponse<Publisher | Error>) => {
        if (pub.Success) {
          this.Publisher = pub.Data as Publisher;
        }
        else {
          var error: Error = pub.Data as Error;

          const errComponent = temporalStorage.getFromStorage<Function>("show_error_popup");
          errComponent.call(temporalStorage.getFromStorage("error_popup"), error);
        }
      });
    }
  }
}
