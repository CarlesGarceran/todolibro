import { Component, inject, Input, OnInit } from '@angular/core';
import { BackendService } from '../../../services/backend.service';
import { Review } from '../../../interfaces/review';
import { ReviewEntryComponent } from "../review-entry/review-entry.component";
import { LoadingFieldComponent } from "../../loading-field/loading-field.component";
import { GlowingTextComponent } from "../../text/glowing-text/glowing-text.component";
import { ErrorPopupComponent } from '../../popups/error-popup/error-popup.component';
import { Error } from '../../../interfaces/Error';

@Component({
  selector: 'app-review-box',
  imports: [ReviewEntryComponent, LoadingFieldComponent, GlowingTextComponent],
  templateUrl: './review-box.component.html',
  styleUrl: './review-box.component.css'
})
export class ReviewBoxComponent implements OnInit {
  private backendService: BackendService = inject(BackendService);

  @Input()
  public ISBN : string = "";
  public reviews : Review[] = [];

  ngOnInit(): void {
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
}
