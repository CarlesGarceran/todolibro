import { AfterViewInit, Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { Libro } from '../../../interfaces/libro';
import { AddLibroFormComponent } from '../../admin/forms/add-libro-form/add-libro-form.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Author } from '../../../interfaces/author';
import { BackendService } from '../../../services/backend.service';
import { ErrorPopupComponent } from '../error-popup/error-popup.component';
import { temporalStorage } from '../../../classes/TemporalStorage';
import { Error } from '../../../interfaces/Error';
import { Publisher } from '../../../interfaces/publisher';
import { SearchableSelectComponent } from "../../searchable-select/searchable-select.component";

@Component({
  selector: 'app-book-popup',
  imports: [CommonModule, FormsModule, SearchableSelectComponent],
  templateUrl: './book-popup.component.html',
  styleUrl: './book-popup.component.css'
})
export class BookPopupComponent implements AfterViewInit, OnInit {
  private visible: boolean = false;
  private backendService: BackendService = inject(BackendService);

  @ViewChild("modalHandler", { static: false })
  protected modalHandler?: ElementRef<HTMLInputElement>;


  @Input()
  public popupTitle: string = "";

  public dateString: string = "";

  protected local_libro: Libro = {
    ISBN: '',
    Name: '',
    Author: 0,
    Publisher: 0,
    LaunchDate: new Date(),
    Image: '',
    Synopsis: "",
    Price: 0,
    Stock: 0
  };

  private libroFormComponent!: AddLibroFormComponent;
  protected libroPtr: Libro = {
    ISBN: '',
    Name: '',
    Author: 0,
    Publisher: 0,
    LaunchDate: new Date(),
    Image: '',
    Synopsis: "",
    Price: 0,
    Stock: 0
  };

  protected authors: Author[] = [];
  protected publishers: Publisher[] = [];

  ngOnInit(): void {
    this.backendService.getAuthors().subscribe((rsp) => {
      if (rsp.Success) {
        this.authors = rsp.Data as Author[];
      }
      else {
        const errorInstance = temporalStorage.getFromStorage<ErrorPopupComponent>("error_popup");
        const errorFunc = temporalStorage.getFromStorage<Function>("show_error_popup");

        errorFunc.call(errorInstance, (rsp.Data as Error));
      }
    });

    this.backendService.getPublishers().subscribe((rsp) => {
      if (rsp.Success) {
        this.publishers = rsp.Data as Publisher[];
      }
      else {
        const errorInstance = temporalStorage.getFromStorage<ErrorPopupComponent>("error_popup");
        const errorFunc = temporalStorage.getFromStorage<Function>("show_error_popup");

        errorFunc.call(errorInstance, (rsp.Data as Error));
      }
    });
  }

  constructor() {

  }

  setLibro(libro: Libro, formComponent: AddLibroFormComponent) {
    this.local_libro = libro;
    this.libroFormComponent = formComponent;

    if (this.local_libro.ISBN == '') {
      this.popupTitle = "Añadir Libro";
    }
    else {
      this.popupTitle = "Editando Libro: " + this.local_libro.Name;
    }

    this.dateString = this.convertToHTML(this.local_libro.LaunchDate);

    Object.assign(this.libroPtr, libro);
  }

  setVisible(value: boolean) {
    this.visible = value;
  }

  ngAfterViewInit(): void {
    if (this.modalHandler != null && this.visible) {
      console.log("Showing popup");
      this.modalHandler?.nativeElement.click();
    }
  }

  showPopup() {
    if (this.visible == true) return;

    this.modalHandler?.nativeElement.click();
    this.visible = true;
  }

  hidePopup() {
    if (this.visible == false) return;

    this.modalHandler?.nativeElement.click();
    this.visible = false;
  }

  descartarCambios() {
    this.local_libro = this.libroPtr;
    this.hidePopup();
  }

  saveInstance() {
    if (this.local_libro != null) {
      this.local_libro.LaunchDate =  new Date(this.dateString);
      this.libroFormComponent.libroUpdated(this.local_libro, this.libroPtr);
    }
    this.hidePopup();
  }

  convertToHTML(date?: Date): string {
    if (date != null)
      return date.getFullYear().toString().padStart(4, '0') + "-" +
        (date.getMonth() + 1).toString().padStart(2, '0') + "-" +
        date.getDate().toString().padStart(2, '0');

    return "";
  }

  toStringArrayPublishers(publishers : Publisher[]) : string[]
  {
    var arr : string[] = [];

    publishers.forEach(element => arr.push(`${element.PublisherId} - ${element.Name}`));

    return arr;
  }

  
  toStringArrayAuthors(authors : Author[]) : string[]
  {
    var arr : string[] = [];

    authors.forEach(element => arr.push(`${element.AuthorId} - ${element.Name}`));

    return arr;
  }

  onAuthorSelected(event : string)
  {
    if(event == "")
      return;

    const id : number = Number.parseInt(event.substring(0, event.indexOf(' ')));
    console.log(id);
    this.local_libro.Author = id;
  }

  onPublisherSelected(arg : string)
  {
    if(arg == "")
      return;
    
    const id : number = Number.parseInt(arg.substring(0, arg.indexOf(' ')));
    console.log(id);
    this.local_libro.Publisher = id;
  }
}
