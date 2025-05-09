import { Component, ElementRef, inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { LinearStorage } from "../../../classes/LinearStorage";
import { Libro } from "../../../interfaces/libro";
import { LoadingComponent } from "../../loading/loading.component";
import { CarouselBookItemComponent } from "../carousel-book-item/carousel-book-item.component";
import { BackendService } from "../../../services/backend.service";

@Component({
  selector: 'app-linear-carousel',
  imports: [CarouselBookItemComponent, LoadingComponent],
  templateUrl: './linear-carousel.component.html',
  styleUrl: './linear-carousel.component.css'
})
export class LinearCarouselComponent extends LinearStorage<Libro> implements OnInit, OnChanges {
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

  @Input("book_buffer")
  public libro_buffer : Libro[] = [];

  @Input("prepackedData")
  public inputData : boolean = false;

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
    this.data = this.libro_buffer;
  }

  ngOnChanges(changes: SimpleChanges): void 
  {
    this.setLibros(this.libro_buffer);
  }

  ngOnInit(): void {

    this.data = this.libro_buffer;

    if(this.libro_buffer.length <= 0 && !this.inputData)
    {
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
  }

  fixNumbers(n : number) : number
  {
    return parseFloat(n + "");
  }

  setLibros(buffer : Libro[])
  {
    for(let x = 0; x < this.data.length; x++)
    {
      this.data.pop();
    }

    buffer.forEach((value: Libro) => {
      value.Price = this.fixNumbers(value.Price);
      this.data.push(value);
    });
    this.generateDataChunk();
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
