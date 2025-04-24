import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { BackendService } from '../../../services/backend.service';
import { Review } from '../../../interfaces/review';
import { ReviewEntryComponent } from "../review-entry/review-entry.component";
import { LoadingFieldComponent } from "../../loading-field/loading-field.component";
import { GlowingTextComponent } from "../../text/glowing-text/glowing-text.component";
import { ErrorPopupComponent } from '../../popups/error-popup/error-popup.component';
import { Error } from '../../../interfaces/Error';
import { InteractableStarComponent } from "../../interactable-star-component/interactable-star-component.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-review-box',
  imports: [ReviewEntryComponent, LoadingFieldComponent, GlowingTextComponent, InteractableStarComponent, FormsModule],
  templateUrl: './review-box.component.html',
  styleUrl: './review-box.component.css'
})
export class ReviewBoxComponent implements OnInit {
  private backendService: BackendService = inject(BackendService);

  @Input()
  public ISBN : string = "";
  public reviews : Review[] = [];

  public myReview : Review | null = null;

  @ViewChild("starComponent")
  protected starComponent? : InteractableStarComponent; 
  protected reviewText : string = "";

  ngOnInit(): void {

    this.backendService.getMyReview(this.ISBN).subscribe((rsp) => {
      if(rsp.Success)
      {
        this.myReview = (rsp.Data as Review);
      }
      else
      {
        ErrorPopupComponent.throwError(rsp.Data as Error);
      }
    });

    this.backendService.getReviews(this.ISBN).subscribe((rsp) => {
      if(rsp.Success)
      {
        this.reviews = (rsp.Data as Review[]);
      }
      else
      {
        ErrorPopupComponent.throwError(rsp.Data as Error);
      }
    });
  }

  publishReview()
  {
    const review : Review = {
      Comment: this.reviewText,
      Rating: (this.starComponent?.AverageRating || 0),
      ISBN: this.ISBN,
      UserId: 0
    };

    this.backendService.addReview(review).subscribe((rsp) => {
      if(!rsp.Success)
      {
        ErrorPopupComponent.throwError(rsp.Data as Error);
      }
      else
      {
        window.location.reload();
      }
    })
  }
}
