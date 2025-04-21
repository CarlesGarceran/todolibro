import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar as STAR_FILLED } from '@fortawesome/free-solid-svg-icons';
import { faStar as STAR_EMPTY } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-app-star-rating',
  imports: [FontAwesomeModule],
  templateUrl: './app-star-rating.component.html',
  styleUrl: './app-star-rating.component.css'
})
export class AppStarRatingComponent implements OnInit {
  @Input("Rating")
  public AverageRating : number = 0;
  protected entries : boolean[] = [];

  public starFilled = STAR_FILLED;
  public starEmpty = STAR_EMPTY;

  createEntries()
  {
    for(let i = 0; i < this.AverageRating; i++)
    {
      this.entries.push(true);
    }

    for(let i = this.entries.length; i < 5; i++)
    {
      this.entries.push(false);
    }
  }

  constructor() 
  {
    this.createEntries();
  }

  ngOnInit(): void 
  {
    this.createEntries();
  }
}
