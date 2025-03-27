import { Component, inject } from '@angular/core';
import { FormGroup, FormsModule, FormArray, FormControl } from '@angular/forms'
import { Router, RouterLink } from '@angular/router';
import { TopbarComponent } from '../../topbar/topbar.component'
import { CryptoService } from '../../services/crypto.service';
import { BackendService } from '../../services/backend.service';
import { CookiesService } from '../../services/cookies.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, TopbarComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent 
{
  Username : string = "";
  Email : string = "";
  Password : string = "";

  cryptoBro : CryptoService = inject(CryptoService);
  sessionService: SessionService = inject(SessionService);
  cookieService : CookiesService = inject(CookiesService);
  router : Router = inject(Router);

  constructor() 
  {
    if(this.cookieService.hasCookie("sessionId"))
      this.router.navigate(["/home"], {});
  }

  onSubmitRegistry()
  {
    var passwordHash : string = this.cryptoBro.getSHA256Hash(this.Password);

    this.sessionService.registerUser({
      name: this.Username,
      email: this.Email,
      password: passwordHash
    }).subscribe((obj : any) => {

      if(obj['error_code'] != null)
      {

      }
      else
        this.router.navigate(["/home"], {});
    });
  }
}
