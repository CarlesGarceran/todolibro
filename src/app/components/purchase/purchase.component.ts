import { Component, inject, ViewChild } from '@angular/core';
import { PurchaseDetails } from '../../interfaces/purchase-details';
import { GlowingTextComponent } from "../text/glowing-text/glowing-text.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackendService } from '../../services/backend.service';
import { ErrorPopupComponent } from '../popups/error-popup/error-popup.component';
import { Error } from '../../interfaces/Error';
import { CreditCardComponent } from "../credit-card/credit-card.component";

@Component({
  selector: 'app-component-purchase',
  standalone: true,
  imports: [GlowingTextComponent, CommonModule, FormsModule, CreditCardComponent],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent {

  protected purchaseDetails : PurchaseDetails = {
    cardCVV: "",
    cardDetails: "",
    cardExpirationDate: "",
    cardOwner: ""
  };
  @ViewChild("cardRef")
  protected creditCardComponent! : CreditCardComponent;

  private backendService : BackendService = inject(BackendService);

  onPurchase()
  {
    this.purchaseDetails = this.creditCardComponent.cardDetails;

    console.log(this.purchaseDetails);

    this.backendService.purchaseCart(this.purchaseDetails).subscribe((rsp) => {
      if(!rsp.Success)
      {
        ErrorPopupComponent.throwError(rsp.Data as Error);
      }
    });
  }

  clearDetails()
  {
    this.creditCardComponent.clearDetails();
  }
}
