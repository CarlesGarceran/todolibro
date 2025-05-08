import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardIssuerService {

  private cardPatterns = [
    { name: 'visa', pattern: /^4/, logo: 'assets/card_icons/visa.svg' },
    { name: 'mastercard', pattern: /^5[1-5]|^2[2-7]/, logo: 'assets/card_icons/mastercard.svg' },
    { name: 'amex', pattern: /^3[47]/, logo: 'assets/card_icons/amex.svg' },
    { name: 'discover', pattern: /^6(?:011|5)/, logo: 'assets/card_icons/discover.svg' }
  ];

  getCardIssuer(cardNumber: string): { name: string, logo: string } | null 
  {
    const trimmed = cardNumber.substring(0, 6); // Get only first 6 digits
    return this.cardPatterns.find(card => card.pattern.test(trimmed)) || null;
  }
}
