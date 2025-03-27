import { Component, inject } from '@angular/core';
import { TopbarComponent } from '../../topbar/topbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { CookiesService } from '../../services/cookies.service';
import { LinearCarouselComponent } from "../../linear-carousel/linear-carousel.component";


@Component({
  selector: 'app-home',
  imports: [TopbarComponent, LinearCarouselComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  constructor() 
  {

  }
}
