import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Libro } from '../../../interfaces/libro';
import { AddLibroFormComponent } from '../../admin/forms/add-libro-form/add-libro-form.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-popup',
  imports: [CommonModule, FormsModule],
  templateUrl: './book-popup.component.html',
  styleUrl: './book-popup.component.css'
})
export class BookPopupComponent implements AfterViewInit {
  private visible : boolean = false;

  @ViewChild("modalHandler", { static: false })
  protected modalHandler? : ElementRef<HTMLInputElement>;
  

  @Input()
  public popupTitle : string = "";

  protected local_libro : Libro = {
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

  private libroFormComponent! : AddLibroFormComponent;
  protected libroPtr : Libro = {
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

  constructor() {
    
  }

  setLibro(libro : Libro, formComponent : AddLibroFormComponent)
  {
    this.local_libro = libro;
    this.libroFormComponent = formComponent;
   
    if(this.local_libro.ISBN == '')
    {
      this.popupTitle = "Añadir Libro";
    }
    else
    {
      this.popupTitle = "Editando Libro: " + this.local_libro.Name;
    }

    Object.assign(this.libroPtr, libro);
  }

  setVisible(value : boolean)
  {
    this.visible = value;
  }

  ngAfterViewInit(): void 
  {
    if(this.modalHandler != null && this.visible)
    {
      console.log("Showing popup");
      this.modalHandler?.nativeElement.click();
    }
  }

  showPopup()
  {
    if(this.visible == true) return;

    this.modalHandler?.nativeElement.click();
    this.visible = true;
  }

  hidePopup()
  {
    if(this.visible == false) return;

    this.modalHandler?.nativeElement.click();
    this.visible = false;
  }

  descartarCambios()
  {
    this.local_libro = this.libroPtr;
    this.hidePopup();
  }

  saveInstance()
  {
    if(this.local_libro != null)
    {
      this.libroFormComponent.libroUpdated(this.local_libro, this.libroPtr);
    }
    this.hidePopup();
  }

  convertToHTML(date? : Date) : string
  {
    if(date != null)
      return date.getFullYear().toString().padStart(4, '0') + "-" + 
    (date.getMonth()+1).toString().padStart(2, '0') + "-" +
    date.getDate().toString().padStart(2, '0');

    return "";
  }
}
