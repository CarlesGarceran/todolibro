import { Component, Input } from '@angular/core';
import { faStar as STAR_FILLED, faStarHalfStroke as STAR_HALF } from '@fortawesome/free-solid-svg-icons';
import { faStar as STAR_EMPTY } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-interactable-star-component',
  imports: [FontAwesomeModule],
  templateUrl: './interactable-star-component.component.html',
  styleUrl: './interactable-star-component.component.css'
})
export class InteractableStarComponent {
  @Input("Rating")
  public AverageRating : number = 0.5;

  public starFilled = STAR_FILLED;
  public halfStar = STAR_HALF;
  public starEmpty = STAR_EMPTY;

  @Input("showText")
  public showText : boolean = true;

  protected maxValue : number[] = [ 1, 2, 3, 4, 5 ];

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


  setStarsValue(rate : number, event : MouseEvent)
  {
    const starElement = event.target as HTMLElement;
    const rect = starElement.getBoundingClientRect();
    const clickX = event.clientX;

    if (clickX < (rect.left + (rect.width / 2)))
    {
      this.AverageRating = rate - 0.5;
    }
    else
    {
      this.AverageRating = rate;
    }
  }
}
