import { Component, inject, OnInit } from '@angular/core';
import { TopbarComponent } from "../../components/topbar/topbar.component";;
import { RouterOutlet } from '@angular/router';
import { LinearCarouselComponent } from "../../components/linear-carousel/linear-carousel.component";
import { UserData } from '../../classes/UserData';
import { User } from '../../interfaces/user';
import { FooterComponent } from "../../components/footer/footer.component";
import { Libro } from '../../interfaces/libro';
import { BackendService } from '../../services/backend.service';
import { ErrorPopupComponent } from '../../components/popups/error-popup/error-popup.component';
import { Error } from '../../interfaces/Error';


@Component({
  selector: 'app-home',
  imports: [TopbarComponent, LinearCarouselComponent, RouterOutlet, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  protected masComprados : Libro[] = [];
  protected userLoggedIn : boolean = false;
  private user? : User;
  private backendService : BackendService = inject(BackendService);

  constructor() 
  {
  }

  ngOnInit(): void {
    this.user = UserData.getUser();
    this.userLoggedIn = (this.user != null);


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
  }
}
