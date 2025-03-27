import { Component, ElementRef, inject, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { Libro } from '../interfaces/libro';
import { LinearStorage } from '../classes/LinearStorage';
import { CarouselBookItemComponent } from '../components/child_components/carousel-book-item/carousel-book-item.component';
import { BackendService } from '../services/backend.service';
import { LoadingComponent } from "../components/loading/loading.component";

@Component({
  selector: 'app-linear-carousel',
  imports: [CarouselBookItemComponent, LoadingComponent],
  templateUrl: './linear-carousel.component.html',
  styleUrl: './linear-carousel.component.css'
})
export class LinearCarouselComponent extends LinearStorage<Libro> implements OnInit {
  @Input("header_name")
  public header: string = "";

  private show_same_line: number = 5;
  private counter = 0;

  private backendService: BackendService = inject(BackendService);

  private isLoading: boolean = false;

  /* SCROLLING */
  private scrollInterval: any;
  private holding = false;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  scrollLeft() {
    if (this.holding == false)
      this.scrollContainer.nativeElement.scrollBy({ left: -100, behavior: 'smooth' });
    else
      this.scrollContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    if (this.holding == false)
      this.scrollContainer.nativeElement.scrollBy({ left: 100, behavior: 'smooth' });
    else
      this.scrollContainer.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }

  startScrollLeft() {
    if (!this.holding) {
      this.holding = true;
      this.scrollInterval = setInterval(() => {
        this.scrollLeft();
      }, 100);
    }
  }

  startScrollRight() {
    if (!this.holding) {
      this.holding = true;
      this.scrollInterval = setInterval(() => {
        this.scrollRight();
      }, 100);
    }
  }

  // Stop the scrolling when the mouse is released or leaves the button
  stopScroll() {
    this.holding = false;
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
      this.scrollInterval = null;
    }
  }


  constructor() {
    super("libro");

    /*

    this.data?.push(
      {
        ISBN: 0,
        Name: "TITLE 1",
        Author: 0,
        Publisher: 0,
        Image: "https://c.wallhere.com/photos/1a/10/Chainsaw_Man_red_background_feathers_scars_misaka_asa-2169061.jpg!d"
      }
    );
    
    this.data?.push(
      {
        ISBN: 0,
        Name: "TITLE 2",
        Author: 0,
        Publisher: 0,
        Image: "https://c.wallhere.com/photos/1a/10/Chainsaw_Man_red_background_feathers_scars_misaka_asa-2169061.jpg!d"
      }
    );
    
    
    this.data?.push(
      {
        ISBN: 0,
        Name: "TITLE 3",
        Author: 0,
        Publisher: 0,
        Image: "https://c.wallhere.com/photos/1a/10/Chainsaw_Man_red_background_feathers_scars_misaka_asa-2169061.jpg!d"
      }
    );
    
    
    this.data?.push(
      {
        ISBN: 0,
        Name: "TITLE 4",
        Author: 0,
        Publisher: 0,
        Image: "https://c.wallhere.com/photos/1a/10/Chainsaw_Man_red_background_feathers_scars_misaka_asa-2169061.jpg!d"
      }
    );
    
    
    this.data?.push(
      {
        ISBN: 0,
        Name: "TITLE 5",
        Author: 0,
        Publisher: 0,
        Image: "https://c.wallhere.com/photos/1a/10/Chainsaw_Man_red_background_feathers_scars_misaka_asa-2169061.jpg!d"
      }
    );

    
    this.data?.push(
      {
        ISBN: 0,
        Name: "TITLE 6",
        Author: 0,
        Publisher: 0,
        Image: "https://2.bp.blogspot.com/-IxQFw8UKBQc/VANQF3Yh1HI/AAAAAAAAAZE/m3ONw94MHqU/s1600/bt0PNcd.jpg"
      }
    );
    
    this.data?.push(
      {
        ISBN: 0,
        Name: "TITLE 7",
        Author: 0,
        Publisher: 0,
        Image: "https://c.wallhere.com/photos/1a/10/Chainsaw_Man_red_background_feathers_scars_misaka_asa-2169061.jpg!d"
      }
    );
    
    this.data?.push(
      {
        ISBN: 0,
        Name: "TITLE 8",
        Author: 0,
        Publisher: 0,
        Image: "https://c.wallhere.com/photos/1a/10/Chainsaw_Man_red_background_feathers_scars_misaka_asa-2169061.jpg!d"
      }
    );
    
    this.data?.push(
      {
        ISBN: 0,
        Name: "TITLE 9",
        Author: 0,
        Publisher: 0,
        Image: "https://c.wallhere.com/photos/1a/10/Chainsaw_Man_red_background_feathers_scars_misaka_asa-2169061.jpg!d"
      }
    );
    
    this.data?.push(
      {
        ISBN: 0,
        Name: "TITLE 10",
        Author: 0,
        Publisher: 0,
        Image: "https://2.bp.blogspot.com/-IxQFw8UKBQc/VANQF3Yh1HI/AAAAAAAAAZE/m3ONw94MHqU/s1600/bt0PNcd.jpg"
      }
    );
    
    this.data?.push(
      {
        ISBN: 0,
        Name: "TITLE 11",
        Author: 0,
        Publisher: 0,
        Image: "https://c.wallhere.com/photos/1a/10/Chainsaw_Man_red_background_feathers_scars_misaka_asa-2169061.jpg!d"
      }
    );
    
    this.data?.push(
      {
        ISBN: 0,
        Name: "TITLE 12",
        Author: 0,
        Publisher: 0,
        Image: "https://c.wallhere.com/photos/1a/10/Chainsaw_Man_red_background_feathers_scars_misaka_asa-2169061.jpg!d"
      }
    );

    */

  }

  ngOnInit(): void {

    this.backendService.getLibros(10).subscribe((libros: Libro[]) => {
      libros.forEach((value: Libro) => {
        this.data.push(value);
      })

      if (this.data != null) {
        this.counter = 0;
      }

      this.generateDataChunk();
    });
  }

  generateDataChunk() {
    if (this.counter < 0)
      this.counter = (this.data.length - this.show_same_line) > 0 ? this.data.length - this.show_same_line : 0;

    if ((this.counter + this.show_same_line) > this.data.length)
      this.counter = 0;

    this.buffer = this.data.slice(this.counter, this.counter + this.show_same_line);
  }

  loadMoreBooks() {
    if (this.isLoading) return;

    this.isLoading = true;

  }

}
