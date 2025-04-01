import { Component, inject, OnInit } from '@angular/core';
import { TopbarComponent } from '../../topbar/topbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { CookiesService } from '../../services/cookies.service';
import { LinearCarouselComponent } from "../../linear-carousel/linear-carousel.component";
import { UserData } from '../../classes/UserData';
import { User } from '../../interfaces/user';


@Component({
  selector: 'app-home',
  imports: [TopbarComponent, LinearCarouselComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  private user? : User;
  protected userLoggedIn : boolean = false;

  constructor() 
  {
  }

  ngOnInit(): void {
    this.user = UserData.getUser();
    this.userLoggedIn = (this.user != null);
  }
}
