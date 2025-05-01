import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Error } from '../../../interfaces/Error';
import { temporalStorage } from '../../../classes/TemporalStorage';

@Component({
  selector: 'app-info-popup',
  imports: [],
  templateUrl: './info-popup.component.html',
  styleUrl: './info-popup.component.css'
})
export class InfoPopupComponent {
  protected info?: Error;
  private visible: boolean = false;
  @ViewChild("modalHandler", { static: false })
  protected modalHandler?: ElementRef<HTMLInputElement>;

  @Input()
  public popupTitle: string = "";

  constructor() {
    this.popupTitle = "info ";

    if (temporalStorage.getFromStorage<InfoPopupComponent>("info_popup") == null) {
      temporalStorage.addToStorage<InfoPopupComponent>("info_popup", this);
    }

    if (temporalStorage.getFromStorage<Function>("show_info_popup") == null)
      temporalStorage.addToStorage<Function>("show_info_popup", this.popupShow); 
  
    if (temporalStorage.getFromStorage<Function>("throw_info") == null)
      temporalStorage.addToStorage<Function>("throw_info", InfoPopupComponent.throwInfo); 
  }

  setInfo(err: Error) {
    this.info = err;
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
    if (this.info == null) return;

    this.modalHandler?.nativeElement.click();
    this.visible = true;
  }

  hidePopup() {
    if (this.visible == false) return;

    this.modalHandler?.nativeElement.click();
    this.visible = false;
  }

  popupShow(err : Error, popupTitle : string)
  {
    this.setInfo(err);
    this.popupTitle = popupTitle;
    this.showPopup();
  }

  static throwInfo(err : Error, popupTitle : string)
  {
    const infoInstance = temporalStorage.getFromStorage<InfoPopupComponent>("info_popup");
    const infoFunc = temporalStorage.getFromStorage<Function>("show_info_popup");
  
    infoFunc.call(infoInstance, err, popupTitle);
  }
}