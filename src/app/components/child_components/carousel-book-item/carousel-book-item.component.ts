import { Component, inject, Input, OnInit } from '@angular/core';
import { Libro } from '../../../interfaces/libro';
import { Author } from '../../../interfaces/author';
import { BackendService } from '../../../services/backend.service';
import { Publisher } from '../../../interfaces/publisher';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-carousel-book-item',
  imports: [RouterLink],
  templateUrl: './carousel-book-item.component.html',
  styleUrl: './carousel-book-item.component.css'
})
export class CarouselBookItemComponent implements OnInit {
  @Input("Item")
  public inputItem?: Libro;
  protected Author?: Author;
  protected Publisher?: Publisher;

  private backendService: BackendService = inject(BackendService);

  constructor() {

  }

  ngOnInit(): void {
    if (this.inputItem != null) 
    {
      this.backendService.getAuthor(this.inputItem.Author).subscribe((auth : Author) => {
        this.Author = auth;
      });

      this.backendService.getPublisher(this.inputItem.Publisher).subscribe((pub : Publisher) => {
        this.Publisher = pub;
      });
    }
  }
}
