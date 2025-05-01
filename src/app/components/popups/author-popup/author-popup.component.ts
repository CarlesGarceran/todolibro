import { AddLibroFormComponent } from '../../admin/forms/add-libro-form/add-libro-form.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Author } from '../../../interfaces/author';
import { BackendService } from '../../../services/backend.service';
import { ErrorPopupComponent } from '../error-popup/error-popup.component';
import { temporalStorage } from '../../../classes/TemporalStorage';
import { Error } from '../../../interfaces/Error';
import { Publisher } from '../../../interfaces/publisher';
import { AfterViewInit, Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { AddAuthorFormComponent } from '../../admin/forms/add-author-form/add-author-form.component';

@Component({
  selector: 'app-author-popup',
  imports: [CommonModule, FormsModule],
  templateUrl: './author-popup.component.html',
  styleUrl: './author-popup.component.css'
})
export class AuthorPopupComponent implements AfterViewInit, OnInit {
  private visible : boolean = false;
  private backendService : BackendService = inject(BackendService);

  @ViewChild("modalHandler", { static: false })
  protected modalHandler? : ElementRef<HTMLInputElement>;
  

  @Input()
  public popupTitle : string = "";

  protected local_author : Author = {
    AuthorId: -1,
    Name: "",
    Image: ""
  };

  private authorFormComponent! : AddAuthorFormComponent;
  protected authorPtr : Author = {
    AuthorId: -1,
    Name: "",
    Image: ""
  };

  ngOnInit(): void {
    
  }

  constructor() {
    
  }

  setAuthor(author : Author, formComponent : AddAuthorFormComponent)
  {
    this.local_author = author;
    this.authorFormComponent = formComponent;
   
    if(this.local_author.AuthorId == -1)
    {
      this.popupTitle = "Añadir Autor";
    }
    else
    {
      this.popupTitle = "Editando Autor: " + this.local_author.Name;
    }

    Object.assign(this.authorPtr, author);
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
    this.local_author = this.authorPtr;
    this.hidePopup();
  }

  saveInstance()
  {
    if(this.local_author != null)
    {
      this.authorFormComponent.authorUpdated(this.local_author, this.authorPtr);
    }
    this.hidePopup();
  }
}
