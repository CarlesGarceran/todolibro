import { Component, inject, Inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CookiesService } from '../services/cookies.service';
import { User } from '../interfaces/user';
import { SiteConfigService } from '../services/siteconfig.service';
import { SessionService } from '../services/session.service';
import { BackendService } from '../services/backend.service';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';
import { LoggingService } from '../services/logging.service';


@Component({
  selector: 'app-topbar',
  imports: [RouterLink, SearchBarComponent],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent implements OnInit {
  backendServide: BackendService = inject(BackendService);
  sessionService: SessionService = inject(SessionService);
  siteconfigService: SiteConfigService = inject(SiteConfigService);
  cookiesService: CookiesService = inject(CookiesService);
  loggingService : LoggingService = inject(LoggingService);
  router: Router = inject(Router);

  protected site_title?: string;

  protected loggedIn?: boolean;
  protected userData: User = { username: 'NULL', id: -1, profile_picture: '', email: '' };

  protected clearanceLevel: number = 0;

  constructor() {
    this.siteconfigService.getSiteNameAsync().subscribe((rsp: string) => {
      this.site_title = rsp;
    });
  }

  ngOnInit(): void {
    this.loggedIn = this.cookiesService.hasCookie("sessionId");

    if (this.loggedIn) {
      this.backendServide.getUserData().subscribe((response: User) => {
        this.userData = response;
      });

      this.backendServide.getUserRole().subscribe((value: number) => {
        this.clearanceLevel = value;
      });
    }
  }

  userIsAdministrator(clearance_level: number = 0): boolean {
    return clearance_level <= this.clearanceLevel;
  }

  userHasLoggedIn(): boolean {
    return ((this.loggedIn == true) && this.userData != null);
  }


  closeSession() {
    this.sessionService.logout().subscribe((o: any) => {
      window.location.reload();
    });
  }


  toAdminPanel()
  {
    this.loggingService.logToServer(`User: '${this.userData.username}', Has Entered into the administration panel.`).subscribe(()=>{
      this.router.navigate(["/admin"]);
    });
  }
}
