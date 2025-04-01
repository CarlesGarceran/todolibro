import { Injectable } from '@angular/core';
import sha256 from 'crypto-js/sha256';
import sha512 from 'crypto-js/sha512';

@Injectable({
  providedIn: 'root'
})
export class CryptoService 
{
  getSHA256Hash(contents : string) : string
  {
    return sha256(contents).toString();
  }

  getSHA512Hash(contents : string) : string
  {
    return sha512(contents).toString();
  }
}
