import { Component, inject, Input, OnInit } from '@angular/core';
import { Review } from '../../../interfaces/review';
import { AppStarRatingComponent } from "../../app-star-rating/app-star-rating.component";
import { CacheStorage } from '../../../classes/CacheStorage';
import { temporalStorage } from '../../../classes/TemporalStorage';
import { BackendService } from '../../../services/backend.service';
import { User } from '../../../interfaces/user';
import { FormsModule } from '@angular/forms';
import { InteractableStarComponent } from "../../interactable-star-component/interactable-star-component.component";
import { ErrorPopupComponent } from '../../popups/error-popup/error-popup.component';
import { Error } from '../../../interfaces/Error';

@Component({
  selector: 'app-review-entry',
  imports: [AppStarRatingComponent, FormsModule, InteractableStarComponent],
  templateUrl: './review-entry.component.html',
  styleUrl: './review-entry.component.css'
})
export class ReviewEntryComponent implements OnInit {
  @Input("review")
  public entry!: Review;
  @Input("isMine")
  public isMine: boolean = false;
  public imageUrl?: string = "/assets/default_pfp.png";

  protected isEditing: boolean = false;
  protected editingString: string = "";
  protected editingRating: number = 0;

  private cache: CacheStorage = new CacheStorage();
  private backendService: BackendService = inject(BackendService);

  ngOnInit(): void {
    if (temporalStorage.getFromStorage<CacheStorage>("usernames_cache")) {
      this.cache = temporalStorage.getFromStorage<CacheStorage>("usernames_cache");
    }

    this.backendService.getUserDataById(this.entry.UserId).subscribe((rsp) => {
      if (rsp.Success) {
        this.imageUrl = (rsp.Data as { userId: number, Name: string, ProfilePicture: string, Email: string, PasswordHash: string }).ProfilePicture;
      }
    })
  }

  getUser(id: number): string {
    if (this.cache.getFromCache(id.toString()) != null) {
      return this.cache.getFromCache<string>(id.toString());
    }
    else {
      this.backendService.getUserName(id).subscribe((rsp) => {
        if (rsp.Success) {
          this.cache.addToCache(id.toString(), (rsp.Data as { id: number, username: string }).username);
        }
      });
    }

    return "";
  }

  setEdit(value: boolean) {
    this.isEditing = value;
    this.editingString = this.entry.Comment;
    this.editingRating = this.entry.Rating;
  }

  editEntry() {
    this.entry.Comment = this.editingString;
    this.entry.Rating = this.editingRating;

    this.setEdit(false);
    this.backendService.updateReview(this.entry.ISBN, this.entry).subscribe((rsp) => {
      if (!rsp.Success) {
        ErrorPopupComponent.throwError(rsp.Data as Error);
      }
    })
  }

  deleteEntry() {
    this.backendService.deleteReview(this.entry.ISBN).subscribe((rsp) => {
      if (!rsp.Success) {
        ErrorPopupComponent.throwError(rsp.Data as Error);
      }
      else
      {
        window.location.reload();
      }
    })
  }
}
