import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { TopbarComponent } from "../../components/topbar/topbar.component";;
import { Publisher } from '../../interfaces/publisher';
import { BackendService } from '../../services/backend.service';
import { ActivatedRoute } from '@angular/router';
import { BackendResponse } from '../../interfaces/backend-response';
import { Error } from '../../interfaces/Error';
import { temporalStorage } from '../../classes/TemporalStorage';
import { ErrorPopupComponent } from '../../components/popups/error-popup/error-popup.component';
import { LoadingComponent } from "../../components/loading/loading.component";
import { LinearCarouselComponent } from "../../components/linear-carousel/linear-carousel.component";
import { GlowingTextComponent } from "../../components/text/glowing-text/glowing-text.component";
import { Libro } from '../../interfaces/libro';
import { FooterComponent } from "../../components/footer/footer.component";
import { LibroEntryComponent } from "../../components/filter/libro-entry/libro-entry.component";

@Component({
  selector: 'app-publisher',
  imports: [TopbarComponent, LoadingComponent, LinearCarouselComponent, GlowingTextComponent, FooterComponent, LibroEntryComponent],
  templateUrl: './publisher.component.html',
  styleUrl: './publisher.component.css'
})
export class PublisherComponent implements OnInit {
  public publisher?: Publisher;
  public mostPurchasedBooks: Libro[] = [];
  public bookBuffer: Libro[] = [];

  private backendService: BackendService = inject(BackendService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private publisherId: number = 0;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((rsp) => {
      this.publisherId = rsp['id'];

      this.backendService.getLibrosMasCompradosByPublisher(this.publisherId).subscribe((rsp: BackendResponse<Libro[] | Error>) => {
        if (!rsp.Success) {
          const errorInstance = temporalStorage.getFromStorage<ErrorPopupComponent>("error_popup");
          const errorFunc = temporalStorage.getFromStorage<Function>("show_error_popup");

          errorFunc.call(errorInstance, (rsp.Data as Error));
        }
        else {
          this.mostPurchasedBooks = (rsp.Data as Libro[]);
        }
      });

      this.backendService.getLibrosByPublisher(this.publisherId).subscribe((rsp: BackendResponse<Libro[] | Error>) => {
        if (!rsp.Success) {
          const errorInstance = temporalStorage.getFromStorage<ErrorPopupComponent>("error_popup");
          const errorFunc = temporalStorage.getFromStorage<Function>("show_error_popup");

          errorFunc.call(errorInstance, (rsp.Data as Error));
        }
        else {
          this.bookBuffer = (rsp.Data as Libro[]);
        }
      });

      this.backendService.getPublisher(this.publisherId).subscribe((rsp: BackendResponse<Publisher | Error>) => {
        if (rsp.Success) {
          this.publisher = (rsp.Data as Publisher);
        }
        else {
          const errorInstance = temporalStorage.getFromStorage<ErrorPopupComponent>("error_popup");
          const errorFunc = temporalStorage.getFromStorage<Function>("show_error_popup");

          errorFunc.call(errorInstance, (rsp.Data as Error));
        }
      });

    });
  }
}
