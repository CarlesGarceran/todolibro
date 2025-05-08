import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Libro } from '../../interfaces/libro';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { PurchaseDetails } from '../../interfaces/purchase-details';
import { ErrorPopupComponent } from '../../components/popups/error-popup/error-popup.component';
import { Error } from '../../interfaces/Error';
import { CreditCardComponent } from "../../components/credit-card/credit-card.component";
import { AppStarRatingComponent } from "../../components/app-star-rating/app-star-rating.component";
import { InfoPopupComponent } from '../../components/popups/info-popup/info-popup.component';

@Component({
  selector: 'app-purchase',
  imports: [TopbarComponent, FooterComponent, CreditCardComponent, AppStarRatingComponent, RouterLink],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent implements OnInit {
  protected libro?: Libro;
  protected purchaseDetails: PurchaseDetails = {
    cardOwner: "",
    cardDetails: "",
    cardExpirationDate: "",
    cardCVV: "",
  }
  protected ISBN: string = "";
  protected rating: number = 0;
  protected authorName: string = "";
  protected publisherName: string = "";
  @ViewChild("cardRef")
  protected creditCardComponent!: CreditCardComponent;

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private backendService: BackendService = inject(BackendService);
  private router: Router = inject(Router);

  ngOnInit(): void {
    this.ISBN = this.activatedRoute.snapshot.params['isbn'];

    this.backendService.getLibro(this.ISBN).subscribe(rsp => this.libro = rsp);
  }

  onPurchase() {
    if (this.libro == null)
      return;

    this.purchaseDetails = this.creditCardComponent.cardDetails;

    this.backendService.purchaseBook(this.libro, this.purchaseDetails).subscribe((rsp) => {
      if (!rsp.Success) {
        ErrorPopupComponent.throwError(rsp.Data as Error);
      }
      else
      {
        this.router.navigate(['/home']).then(() => {
          InfoPopupComponent.throwInfo({
            error_code: 0,
            message: "Se ha realizado la compra."
          }, "Carrito Comprado");
        })
      }
    });
  }

  clearDetails() {
    this.creditCardComponent.clearDetails();
  }
}
