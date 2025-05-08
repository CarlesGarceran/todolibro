import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { Publisher } from '../../../interfaces/publisher';
import { AddPublisherFormComponent } from '../../admin/forms/add-publisher-form/add-publisher-form.component';
import { BackendService } from '../../../services/backend.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-publisher-popup',
  imports: [CommonModule, FormsModule],
  templateUrl: './publisher-popup.component.html',
  styleUrl: './publisher-popup.component.css'
})
export class PublisherPopupComponent {
private visible : boolean = false;
  private backendService : BackendService = inject(BackendService);

  @ViewChild("modalHandler", { static: false })
  protected modalHandler? : ElementRef<HTMLInputElement>;
  

  @Input()
  public popupTitle : string = "";

  protected local_publisher : Publisher = {
    PublisherId: -1,
    Name: "",
    Image: ""
  };

  private publisherFormComponent! : AddPublisherFormComponent;
  protected publisherPtr : Publisher = {
    PublisherId: -1,
    Name: "",
    Image: ""
  };

  ngOnInit(): void {
    
  }

  constructor() {
    
  }

  setPublisher(publisher : Publisher, formComponent : AddPublisherFormComponent)
  {
    this.local_publisher = publisher;
    this.publisherFormComponent = formComponent;
   
    if(this.local_publisher.PublisherId == -1)
    {
      this.popupTitle = "Añadir Editorial";
    }
    else
    {
      this.popupTitle = "Editando Editorial: " + this.local_publisher.Name;
    }

    Object.assign(this.publisherPtr, publisher);
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
    this.local_publisher = this.publisherPtr;
    this.hidePopup();
  }

  saveInstance()
  {
    if(this.local_publisher != null)
    {
      this.publisherFormComponent.publisherUpdated(this.local_publisher, this.publisherPtr);
    }
    this.hidePopup();
  }
}
