import { Component, inject, OnInit } from '@angular/core';
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { LoadingComponent } from "../../components/loading/loading.component";
import { GlowingTextComponent } from "../../components/text/glowing-text/glowing-text.component";
import { Author } from '../../interfaces/author';
import { Libro } from '../../interfaces/libro';
import { LinearCarouselComponent } from "../../components/linear-carousel/linear-carousel.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { BackendService } from '../../services/backend.service';
import { ActivatedRoute } from '@angular/router';
import { BackendResponse } from '../../interfaces/backend-response';
import { Error } from '../../interfaces/Error';
import { temporalStorage } from '../../classes/TemporalStorage';
import { ErrorPopupComponent } from '../../components/popups/error-popup/error-popup.component';

@Component({
  selector: 'app-author',
  imports: [TopbarComponent, LoadingComponent, GlowingTextComponent, LinearCarouselComponent, FooterComponent],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css'
})
export class AuthorComponent implements OnInit {
  protected author?: Author;
  public bookBuffer: Libro[] = [];


  private backendService: BackendService = inject(BackendService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private authorId: number = 0;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((rsp) => {
      this.authorId = rsp['id'];

      this.backendService.getLibrosByAuthor(this.authorId).subscribe((rsp: BackendResponse<Libro[] | Error>) => {
        if (!rsp.Success) {
          ErrorPopupComponent.throwError(rsp.Data as Error);
        }
        else {
          this.bookBuffer = (rsp.Data as Libro[]);
        }
      });

      this.backendService.getAuthor(this.authorId).subscribe((rsp: BackendResponse<Author | Error>) => {
        if (rsp.Success) {
          this.author = (rsp.Data as Author);
        }
        else {
          ErrorPopupComponent.throwError(rsp.Data as Error);
        }
      });

    });
  }
}
