import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar as STAR_FILLED, faStarHalfStroke as STAR_HALF } from '@fortawesome/free-solid-svg-icons';
import { faStar as STAR_EMPTY } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-app-star-rating',
  imports: [FontAwesomeModule],
  templateUrl: './app-star-rating.component.html',
  styleUrl: './app-star-rating.component.css'
})
export class AppStarRatingComponent {
  @Input("Rating")
  public AverageRating : number = 0;

  public starFilled = STAR_FILLED;
  public halfStar = STAR_HALF;
  public starEmpty = STAR_EMPTY;

  @Input("showText")
  public showText : boolean = true;

  get fullStars() : number[]
  {
    return Array(Math.floor(this.AverageRating)).fill(0);
  }

  get hasHalfStar() : boolean {

    return this.AverageRating % 1 >= 0.5;
  }

  get emptyStars(): number[] {
    const fullCount = Math.floor(this.AverageRating);
    const halfCount = this.hasHalfStar ? 1 : 0;
    return Array(5 - fullCount - halfCount).fill(0);
  }
}
