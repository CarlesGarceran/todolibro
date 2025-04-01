import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardIssuerService {

  private cardPatterns = [
    { name: 'visa', pattern: /^4/, logo: 'card_icons/visa.png' },
    { name: 'mastercard', pattern: /^5[1-5]|^2[2-7]/, logo: 'card_icons/mastercard.png' },
    { name: 'amex', pattern: /^3[47]/, logo: 'card_icons/amex.png' },
    { name: 'discover', pattern: /^6(?:011|5)/, logo: 'card_icons/discover.png' }
  ];

  getCardIssuer(cardNumber: string): { name: string, logo: string } | null 
  {
    const trimmed = cardNumber.replace(/\D/g, '').substring(0, 6); // Get only first 6 digits
    return this.cardPatterns.find(card => card.pattern.test(trimmed)) || null;
  }
}
