import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Error } from '../../../interfaces/Error';
import { temporalStorage } from '../../../classes/TemporalStorage';

@Component({
  selector: 'app-error-popup',
  imports: [],
  templateUrl: './error-popup.component.html',
  styleUrl: './error-popup.component.css'
})
export class ErrorPopupComponent {
  protected error?: Error;
  private visible: boolean = false;
  @ViewChild("modalHandler", { static: false })
  protected modalHandler?: ElementRef<HTMLInputElement>;

  @Input()
  public popupTitle: string = "";

  constructor() {
    this.popupTitle = "Error ";

    if (temporalStorage.getFromStorage<ErrorPopupComponent>("error_popup") == null) {
      temporalStorage.addToStorage<ErrorPopupComponent>("error_popup", this);
    }

    if (temporalStorage.getFromStorage<Function>("show_error_popup") == null)
      temporalStorage.addToStorage<Function>("show_error_popup", this.popupShow); 
  }

  setError(err: Error) {
    this.error = err;
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
    if (this.error == null) return;

    this.modalHandler?.nativeElement.click();
    this.visible = true;
  }

  hidePopup() {
    if (this.visible == false) return;

    this.modalHandler?.nativeElement.click();
    this.visible = false;
  }

  popupShow(err : Error)
  {
    this.setError(err);
    this.showPopup();
  }
}