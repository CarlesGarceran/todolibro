import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, FormArray, FormControl } from '@angular/forms'
import { Router, RouterLink } from '@angular/router';
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { CryptoService } from '../../services/crypto.service';
import { BackendService } from '../../services/backend.service';
import { CookiesService } from '../../services/cookies.service';
import { SessionService } from '../../services/session.service';
import { ErrorPopupComponent } from '../../components/popups/error-popup/error-popup.component';
import { Error } from '../../interfaces/Error';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-register',
  imports: [FormsModule, TopbarComponent, FooterComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit
{
  Username : string = "";
  Email : string = "";
  Password : string = "";

  cryptoBro : CryptoService = inject(CryptoService);
  sessionService: SessionService = inject(SessionService);
  cookieService : CookiesService = inject(CookiesService);
  router : Router = inject(Router);

  public showErrorMessage: boolean = false;
  public errorReason: string = "";

  protected invalidEmail : boolean = false;

  @ViewChild("submitButton", { static: false })
  protected submitButton? : ElementRef<HTMLButtonElement>;

  constructor() 
  {
    if(this.cookieService.hasCookie("sessionId"))
      this.router.navigate(["/home"], {});
  }

  ngOnInit(): void {
    document.addEventListener("keydown", (event : KeyboardEvent) => {
      if(event.key === "Enter")
        this.submitButton?.nativeElement.click();
    });
  }

  onSubmitRegistry()
  {
    var passwordHash : string = this.cryptoBro.getSHA256Hash(this.Password);

    this.invalidEmail = !this.isValidEmail(this.Email);

    if(this.invalidEmail)
      return;

    this.sessionService.registerUser({
      name: this.Username,
      email: this.Email,
      password: passwordHash
    }).subscribe((obj) => 
    {
      if(obj.Success)
      {
        this.router.navigate(['/home']);
      }
      else
      {
        this.showErrorMessage = true;
        this.errorReason = (obj.Data as Error).message;
      }
    });
  }

  hideError()
  {
    this.showErrorMessage = false;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
