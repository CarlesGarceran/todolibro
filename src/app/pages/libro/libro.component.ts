import { ChangeDetectorRef, Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { Libro } from '../../interfaces/libro';
import { LoadingComponent } from "../../components/loading/loading.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStore, faShoppingCart, faHeart, faBook } from '@fortawesome/free-solid-svg-icons'
import { temporalStorage } from '../../classes/TemporalStorage';
import { Carrito } from '../../classes/Carrito';
import { CarritoService } from '../../services/carrito.service';
import { UserData } from '../../classes/UserData';
import { Cart } from '../../interfaces/Cart';
import { ErrorPopupComponent } from '../../components/popups/error-popup/error-popup.component';
import { Error } from '../../interfaces/Error';
import { AppStarRatingComponent } from "../../components/app-star-rating/app-star-rating.component";
import { ReviewBoxComponent } from "../../components/reviews/review-box/review-box.component";
import { Author } from '../../interfaces/author';
import { Publisher } from '../../interfaces/publisher';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-libro',
  imports: [TopbarComponent, LoadingComponent, FontAwesomeModule, AppStarRatingComponent, RouterModule, ReviewBoxComponent, FooterComponent],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})
export class LibroComponent implements OnInit {
  private ISBN: string = "-1";

  // SERVICES & INJECTABLES

  private changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private backendService: BackendService = inject(BackendService);
  private carritoService : CarritoService = inject(CarritoService);


  protected rating : number = 0;
  protected libro?: Libro;
  protected storeIcon = faStore;
  protected shoppingCartIcon = faShoppingCart;
  protected wishListIcon = faHeart;
  protected shelveIcon = faBook;
  protected authorName : string = "";
  protected publisherName : string = "";

  ngOnInit(): void {
    this.ISBN = this.route.snapshot.params['isbn'];

    this.backendService.getRating(this.ISBN).subscribe((rsp) => {
      if(rsp.Success)
        {
          var rating = (rsp.Data as { rating : number }).rating;;
          if(rating == null)
            rating = 0;
          
          this.rating = rating;
        }
    });
    this.backendService.getLibro(this.ISBN).subscribe((l: Libro) => {
      var lx = l;

      lx.Price = this.fixNumbers(l.Price);

      this.libro = lx;

      this.backendService.getAuthor(this.libro.Author).subscribe((rsp : Author) => {
        this.authorName = rsp.Name;
      });

      this.backendService.getPublisher(this.libro.Publisher).subscribe((rsp) => {
        if(rsp.Success)
        {
          this.publisherName = (rsp.Data as Publisher).Name;
        }
      });
    });
  }

  fixNumbers(n : number) : number
  {
    return parseFloat(n + "");
  }

  resyncCarrito()
  {
    var cart : Carrito = temporalStorage.getFromStorage<Carrito>("shopping_cart");

    this.carritoService.getCarrito().subscribe((rsp) => {
      if(rsp.Success)
      {
        cart.setCartEntries(rsp.Data as Cart[]);
        temporalStorage.addToStorage("shopping_cart", cart);
      }
      else
      {
        const errorInstance = temporalStorage.getFromStorage<ErrorPopupComponent>("error_popup");
        const errorFunc = temporalStorage.getFromStorage<Function>("show_error_popup");
      
        errorFunc.call(errorInstance, (rsp.Data as Error));
      }
    })
  }


  addToCarrito()
  {
    if(this.libro == null)
      return;

    if(temporalStorage.getFromStorage<Carrito>("shopping_cart") != null)
    {
      var cart : Carrito = temporalStorage.getFromStorage<Carrito>("shopping_cart");

      if(this.carritoService.hasInCarrito(this.libro.ISBN, cart.getCartEntries()))
      {
        const cartEntry = this.carritoService.getFromCarrito(this.libro.ISBN, cart.getCartEntries());

        if(cartEntry != null)
        {
          cartEntry.Quantity+=1;
          
          this.carritoService.updateCarrito(cartEntry).subscribe((rsp)=>
          {
            if(rsp.Success)
            {
              this.resyncCarrito();
              ErrorPopupComponent.throwError({ error_code: 200, message: "Se ha añadido el elemento al carrito" });
            }
          });
        }
        else
        {
          var error : Error = { error_code: 300, message: "Fallo al obtener elemento del carrito local (puede deberse debido a una desincronización entre el servidor y su navegador)." };
          ErrorPopupComponent.throwError(error);
        }
      }
      else
      {
        const cartEntity : Cart = {
          Books_ISBN: this.libro.ISBN,
          Users_userId: -1,
          Quantity: 1
        };
        this.carritoService.addToCarrito(cartEntity).subscribe((rsp) => {
          if(rsp.Success)
          {
            ErrorPopupComponent.throwError({ error_code: 200, message: "Se ha añadido el elemento al carrito" });
            this.resyncCarrito();
          }
        })
      }
    }
    else
    {
      var error : Error = {
        error_code: 300,
        message: "Registrese o inicie sesión para usar esta función."
      } 
      ErrorPopupComponent.throwError(error);
    }
  }
}
