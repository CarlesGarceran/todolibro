import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-book-popup',
  imports: [],
  templateUrl: './book-popup.component.html',
  styleUrl: './book-popup.component.css'
})
export class BookPopupComponent implements AfterViewInit {
  private visible : boolean = true;

  @ViewChild("modalHandler", { static: false })
  protected modalHandler? : ElementRef<HTMLInputElement>;
  

  @Input()
  public popupTitle : string = "";

  constructor() {
    this.popupTitle = "Test Popup";
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

    this.visible = true;
    this.modalHandler?.nativeElement.click();
  }

  hidePopup()
  {
    if(this.visible == false) return;

    this.visible = false;
    this.modalHandler?.nativeElement.click();
  }

}
