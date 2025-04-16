import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { temporalStorage } from '../../../classes/TemporalStorage';

@Component({
  selector: 'app-ask-user-popup',
  imports: [],
  templateUrl: './ask-user-popup.component.html',
  styleUrl: './ask-user-popup.component.css'
})
export class AskUserPopupComponent {

  private visible: boolean = false;
  @ViewChild("modalHandler", { static: false })
  protected modalHandler?: ElementRef<HTMLInputElement>;

  protected header : string = "";
  protected body : string = "";

  protected accept_string : string = "Yes";
  protected deny_string : string = "No";

  private onAcceptCallback? : Function;
  private onDenyCallback? : Function;

  constructor() {

    if (temporalStorage.getFromStorage<AskUserPopupComponent>("ask_user_popup") == null) {
      temporalStorage.addToStorage<AskUserPopupComponent>("ask_user_popup", this);
    }

    if (temporalStorage.getFromStorage<Function>("show_ask_user_popup") == null)
      temporalStorage.addToStorage<Function>("show_ask_user_popup", this.popupShow); 
  
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

  onAccept()
  {
    if(this.onAcceptCallback != null)
    {
      this.onAcceptCallback();
    }
    this.hidePopup();
  }

  popupShow(header : string, 
    body : string, 
    accept_btn : string, 
    deny_btn : string, 
    onAccept? : Function,
    onDeny? : Function)
  {
    this.header = header;
    this.body = body;
    this.accept_string = accept_btn;
    this.deny_string = deny_btn;
    this.onAcceptCallback = onAccept;
    this.onDenyCallback = onDeny;

    this.showPopup();
  }

  onDeny()
  {
    if(this.onDenyCallback != null)
    {
      this.onDenyCallback();
    }
    this.hidePopup();
  }

  static askUser(header : string, 
    body : string, 
    accept_btn : string, 
    deny_btn : string, 
    onAccept? : Function,
    onDeny? : Function)
  {
    const component = temporalStorage.getFromStorage<AskUserPopupComponent>("ask_user_popup");
    const func = temporalStorage.getFromStorage<Function>("show_ask_user_popup");

    func.call(component, header, body, accept_btn, deny_btn, onAccept, onDeny);
  }
}
