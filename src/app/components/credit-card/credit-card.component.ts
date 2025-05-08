import { Component, inject } from '@angular/core';
import { CardIssuerService } from '../../services/card-issuer.service';
import { PurchaseDetails } from '../../interfaces/purchase-details';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-credit-card',
  imports: [CommonModule, FormsModule],
  templateUrl: './credit-card.component.html',
  styleUrl: './credit-card.component.css'
})
export class CreditCardComponent {
  public cardDetails : PurchaseDetails = {
    cardCVV: "",
    cardDetails: "",
    cardExpirationDate: "",
    cardOwner: ""
  };
  cardIssuer : { name: string, logo: string } = { name: "", logo: "" };
  cardService : CardIssuerService = inject(CardIssuerService);

  onInputChange()
  {
    var issuer = this.cardService.getCardIssuer(this.cardDetails.cardDetails);

    if(issuer == null)
      this.cardIssuer = { name: "", logo: "" }
    else
      this.cardIssuer = issuer; 
  }

  public clearDetails()
  {
    this.cardDetails.cardCVV = "";
    this.cardDetails.cardDetails = "";
    this.cardDetails.cardExpirationDate = "";
    this.cardDetails.cardOwner = "";

    this.cardIssuer = { name: "", logo: "" };
  }
}
