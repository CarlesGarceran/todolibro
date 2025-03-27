import { Component, inject, OnInit } from '@angular/core';
import { BackendService } from '../../../services/backend.service';
import { CookiesService } from '../../../services/cookies.service';
import { Router } from '@angular/router';
import { AdminSidebarComponent } from "../../../components/admin/admin-sidebar/admin-sidebar.component";
import { User } from '../../../interfaces/user';
import { LoggingService } from '../../../services/logging.service';

@Component({
  selector: 'app-root',
  imports: [AdminSidebarComponent],
  templateUrl: './root.component.html',
  styleUrl: './root.component.css'
})
export class RootComponent implements OnInit {
  private router : Router = inject(Router);
  private loggingService : LoggingService = inject(LoggingService);
  private cookieService : CookiesService = inject(CookiesService);
  private backendService : BackendService = inject(BackendService);
  private loggedIn : boolean = false;
  private canAccess : boolean = false;
  protected opLevel : number = 0;
  protected user? : User;

  ngOnInit(): void {
    this.loggedIn = this.cookieService.hasCookie("sessionId");
    this.backendService.getUserRole().subscribe((role : number)=>
    {
      this.backendService.getUserData().subscribe((u : User)=>{
        this.user = u;
      }).add(()=>
      {
        this.opLevel = role;
  
        if(role > 0)
          this.canAccess = true;
  
        if(this.hasAccess() == false)
        {
          this.loggingService.logToServer(`[INCIDENT]: User ${this.user?.username}, id ${this.user?.id}, has tried accessing the admin panel. User does not have privileges to do this.`).subscribe(()=>
          {
            this.router.navigate(["/home"]);
          });
        }
      });
    });
  }

  hasAccess() : boolean { return this.canAccess; }



  returnToSite()
  {
    this.router.navigate(["/home"]);
  }
}
