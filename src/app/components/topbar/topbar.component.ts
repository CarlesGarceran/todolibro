import { Component, inject, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartComponent } from "../cart/cart.component";
import { ThemeSelectorComponent } from '../theme-selector/theme-selector.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { BackendService } from '../../services/backend.service';
import { SessionService } from '../../services/session.service';
import { SiteConfigService } from '../../services/siteconfig.service';
import { CookiesService } from '../../services/cookies.service';
import { LoggingService } from '../../services/logging.service';
import { User } from '../../interfaces/user';
import { UserData } from '../../classes/UserData';
import { BackendResponse } from '../../interfaces/backend-response';
import { Error } from '../../interfaces/Error';


@Component({
  selector: 'app-topbar',
  imports: [RouterLink, SearchBarComponent, ThemeSelectorComponent, CartComponent],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent implements OnInit, OnChanges {
  backendServide: BackendService = inject(BackendService);
  sessionService: SessionService = inject(SessionService);
  siteconfigService: SiteConfigService = inject(SiteConfigService);
  cookiesService: CookiesService = inject(CookiesService);
  loggingService: LoggingService = inject(LoggingService);
  router: Router = inject(Router);

  protected site_title?: string;

  protected loggedIn?: boolean;
  protected userData?: User = { username: 'NULL', id: -1, profile_picture: '', email: '' };

  protected clearanceLevel: number = 0;

  constructor() {
    this.siteconfigService.getSiteNameAsync().subscribe((rsp: string) => {
      this.site_title = rsp;
    });
  }

  ngOnInit(): void {
    this.loggedIn = this.cookiesService.hasCookie("sessionId");

    if (!this.loggedIn)
      return;

    if (UserData.getUser() !== undefined) {
      this.userData = UserData.getUser();
      return;
    }

    try {
      this.backendServide.getUserData().subscribe((response: BackendResponse<User | Error>) => {
        if (response.Success) {
          this.userData = response.Data as User;
          UserData.setUser(response.Data as User);

          this.backendServide.getUserRole().subscribe((value: number) => {
            this.clearanceLevel = value;
          });
        }
        else {
          this.loggedIn = false;
          this.cookiesService.deleteCookie("sessionId");
        }
      });
    }
    catch (ex) {
      this.loggedIn = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void 
  {
    if(!this.loggedIn)
      return;

    this.backendServide.getUserRole().subscribe((value: number) => {
      this.clearanceLevel = value;
    });
  }

  userIsAdministrator(clearance_level: number = 0): boolean {
    return this.clearanceLevel >= clearance_level;
  }

  userHasLoggedIn(): boolean {
    return ((this.loggedIn == true) && this.userData != null);
  }


  closeSession() {
    this.sessionService.logout().subscribe((o: any) => {
      window.location.reload();
    });
  }

  toAdminPanel() {
    this.loggingService.logToServer(`User: '${this.userData?.username}', Has Entered into the administration panel.`).subscribe(() => {
      this.router.navigate(["/admin"]);
    });
  }
}
