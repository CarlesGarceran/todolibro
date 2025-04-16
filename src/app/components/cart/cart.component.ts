import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { temporalStorage } from '../../classes/TemporalStorage';
import { Carrito } from '../../classes/Carrito';
import { Cart } from '../../interfaces/Cart';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterLink } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { CacheStorage } from '../../classes/CacheStorage';
import { Libro } from '../../interfaces/libro';

@Component({
  selector: 'app-cart',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, OnChanges
{
  private cartService : CarritoService = inject(CarritoService);
  private backendService : BackendService = inject(BackendService);
  private router : Router = inject(Router);

  public cartElements? : Carrito;
  public visible : boolean = true;

  protected shoppingCartIcon = faShoppingCart;
  private cacheStorage : CacheStorage = new CacheStorage();

  constructor() {
    temporalStorage.releaseFromMemory("resync_cart");
    temporalStorage.releaseFromMemory("cart_component");
    temporalStorage.addToStorage("cart_component", this);
    temporalStorage.addToStorage("resync_cart", (callback? : Function)=>{
      this.syncCart().add(()=>{
        if(callback != null)
          callback();
      });
    });
  }

  syncCart()
  {
    return this.cartService.getCarrito().subscribe((rsp)=>
      {
        if(rsp.Success)
        {
          var carrito = new Carrito();
          carrito.setCartEntries(rsp.Data as Cart[]);
          
          temporalStorage.addToStorage("shopping_cart", carrito);
        }
        else
        {
          this.disableComponent();
        }
      });
  }

  ngOnInit(): void 
  {
    this.syncCart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.syncCart();
  }

  disableComponent()
  {

  }

  getCartEntries() : Cart[]
  {
    this.cartElements = temporalStorage.getFromStorage("shopping_cart");

    if(this.cartElements == null)
      return [];

    return this.cartElements?.getCartEntries();
  }

  getBookName(ISBN : string) : string
  {
    if(this.cacheStorage.getFromCache(ISBN) != null)
    {
      return this.cacheStorage.getFromCache<Libro>(ISBN).Name;
    }
    else
    {
      this.backendService.getLibro(ISBN).subscribe((libro : Libro) => {

        this.cacheStorage.addToCache<Libro>(ISBN, libro);

        return libro.Name;
      });
    }

    return "";
  }

  getPrecio(ISBN : string, count : number) : number
  {
    if(this.cacheStorage.getFromCache(ISBN) != null)
    {
      return this.cacheStorage.getFromCache<Libro>(ISBN).Price * count;
    }
    else
    {
      this.backendService.getLibro(ISBN).subscribe((libro : Libro) => {

        this.cacheStorage.addToCache<Libro>(ISBN, libro);

        return libro.Price * count;
      });
    }

    return -1;
  }

  getTotalPrecio() : number
  {
    let precioTotal = 0;

    for(let i = 0; i < this.getCartEntries().length; i++)
    {
      const entry = this.getCartEntries()[i];
      precioTotal += this.getPrecio(entry.Books_ISBN, entry.Quantity);
    }

    return precioTotal;
  }

  navigateToBook(ISBN : string)
  {
    this.router.navigate(['/book', ISBN]).then(()=>{
      window.location.reload();
    });
  }
}
