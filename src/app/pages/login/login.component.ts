import { Component, inject, OnInit } from '@angular/core';
import { TopbarComponent } from '../../topbar/topbar.component'
import { FormsModule } from '@angular/forms'
import { CookiesService } from '../../services/cookies.service';
import { Router } from '@angular/router';
import { CryptoService } from '../../services/crypto.service';
import { BackendService } from '../../services/backend.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, TopbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  Email: string = "";
  Password: string = "";

  sessionService: SessionService = inject(SessionService);
  cookieService: CookiesService = inject(CookiesService);
  cryptoService: CryptoService = inject(CryptoService);
  router: Router = inject(Router);

  public showErrorMessage: boolean = false;
  public errorReason: string = "";

  constructor() {
    this.hideError();

    if (this.cookieService.hasCookie("sessionId"))
      this.router.navigate(["/home"], {});
  }

  ngOnInit(): void {
    this.hideError();
  }

  onSubmitLogin() {
    var passwordHash = this.cryptoService.getSHA256Hash(this.Password);

    this.sessionService.loginUser({
      email: this.Email,
      password: passwordHash
    }).subscribe((obj: any) => {
      if (obj['error_code'] != null) {
        var errorCode : number = obj['error_code'];

        if(errorCode == 800)
        {
          this.errorReason = "El usuario no existe";
        }
        else if(errorCode == 801)
        {
          this.errorReason = "Contraseña incorrecta";
        }

        this.showError();
      }
      else
        this.router.navigate(["/home"], {});
    });
  }

  showError() {
    this.showErrorMessage = true;
  }

  hideError() {
    this.showErrorMessage = false;
  }
}
