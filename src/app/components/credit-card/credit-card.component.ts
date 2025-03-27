import { Component, Inject } from '@angular/core';
import { CardIssuerService } from '../../services/card-issuer.service';

@Component({
  selector: 'app-credit-card',
  imports: [],
  templateUrl: './credit-card.component.html',
  styleUrl: './credit-card.component.css'
})
export class CreditCardComponent {
  cardNumber : string = '';
  cardIssuer : { name: string, logo: string } = { name: "", logo: "" };
  cardService : CardIssuerService = Inject(CardIssuerService);


  onInputChange()
  {
    var issuer = this.cardService.getCardIssuer(this.cardNumber);

    if(issuer == null)
      this.cardIssuer = { name: "", logo: "" }
    else
      this.cardIssuer = issuer; 
  }
}
