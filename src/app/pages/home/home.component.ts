import { Component, inject, OnInit } from '@angular/core';
import { TopbarComponent } from "../../components/topbar/topbar.component";;
import { RouterOutlet } from '@angular/router';
import { UserData } from '../../classes/UserData';
import { User } from '../../interfaces/user';
import { FooterComponent } from "../../components/footer/footer.component";
import { Libro } from '../../interfaces/libro';
import { BackendService } from '../../services/backend.service';
import { ErrorPopupComponent } from '../../components/popups/error-popup/error-popup.component';
import { Error } from '../../interfaces/Error';
import { LinearCarouselComponent } from '../../components/carousel/linear-carousel/linear-carousel.component';
import { LoadingComponent } from "../../components/loading/loading.component";
import { LoadingFieldComponent } from "../../components/loading-field/loading-field.component";


@Component({
  selector: 'app-home',
  imports: [TopbarComponent, LinearCarouselComponent, RouterOutlet, FooterComponent, LoadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  protected recomendados : Libro[] = [];
  protected masComprados : Libro[] = [];
  protected userLoggedIn : boolean = false;
  private user? : User;
  private backendService : BackendService = inject(BackendService);

  constructor() 
  {
  }

  ngOnInit(): void {
    this.user = UserData.getUser();
    this.userLoggedIn = (this.user != undefined);


    this.backendService.getLibrosMasComprados().subscribe((rsp) => {
      if(rsp.Success)
      {
        this.masComprados = rsp.Data as Libro[];
      }
      else
      {
        ErrorPopupComponent.throwError(rsp.Data as Error);
      }
    });

    if(this.userLoggedIn)
    {
      this.backendService.getRecommandedBooks().subscribe(rsp => {
        if(!rsp.Success)
        {
          ErrorPopupComponent.throwError(rsp.Data as Error);
        }
        else
        {
          this.recomendados = rsp.Data as Libro[];
        }
      });
    }
  }

  tryGetSession()
  {
    this.user = UserData.getUser();
    this.userLoggedIn = (this.user != undefined);
  }


  rerollRecommanded()
  {
    if(this.userLoggedIn)
      {
        this.backendService.getRecommandedBooks().subscribe(rsp => {
          if(!rsp.Success)
          {
            ErrorPopupComponent.throwError(rsp.Data as Error);
          }
          else
          {
            this.recomendados = rsp.Data as Libro[];
          }
        });
      }
  }
}
