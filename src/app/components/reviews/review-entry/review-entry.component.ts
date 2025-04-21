import { Component, inject, Input, OnInit } from '@angular/core';
import { Review } from '../../../interfaces/review';
import { AppStarRatingComponent } from "../../app-star-rating/app-star-rating.component";
import { CacheStorage } from '../../../classes/CacheStorage';
import { temporalStorage } from '../../../classes/TemporalStorage';
import { BackendService } from '../../../services/backend.service';

@Component({
  selector: 'app-review-entry',
  imports: [AppStarRatingComponent],
  templateUrl: './review-entry.component.html',
  styleUrl: './review-entry.component.css'
})
export class ReviewEntryComponent implements OnInit {
  @Input("review")
  public entry! : Review;

  private cache : CacheStorage = new CacheStorage();

  private backendService : BackendService = inject(BackendService);

  ngOnInit(): void {
    if(temporalStorage.getFromStorage<CacheStorage>("usernames_cache"))
    {
      this.cache = temporalStorage.getFromStorage<CacheStorage>("usernames_cache");
    }
  }

  getUser(id : number) : string
  {
    if(this.cache.getFromCache(id.toString()) != null)
    {
      return this.cache.getFromCache<string>(id.toString());
    }
    else
    {
      this.backendService.getUserName(id).subscribe((rsp) => {
        if(rsp.Success)
        {
          this.cache.addToCache(id.toString(), (rsp.Data as { id: number, username : string}).username);
        }
      });
    }

    return "";
  }
}
