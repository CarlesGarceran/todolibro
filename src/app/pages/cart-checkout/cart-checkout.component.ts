import { Component, inject, OnInit } from '@angular/core';
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { RouterOutlet } from '@angular/router';
import { GlowingTextComponent } from "../../components/text/glowing-text/glowing-text.component";
import { Cart } from '../../interfaces/Cart';
import { CarritoService } from '../../services/carrito.service';
import { temporalStorage } from '../../classes/TemporalStorage';
import { Carrito } from '../../classes/Carrito';
import { CartComponent } from '../../components/cart/cart.component';
import { ErrorPopupComponent } from '../../components/popups/error-popup/error-popup.component';
import { Error } from '../../interfaces/Error';
import { AskUserPopupComponent } from '../../components/popups/ask-user-popup/ask-user-popup.component';
import { LoadingFieldComponent } from "../../components/loading-field/loading-field.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { PurchaseComponent } from "../../components/purchase/purchase.component";

@Component({
  selector: 'app-cart-checkout',
  imports: [TopbarComponent, RouterOutlet, GlowingTextComponent, LoadingFieldComponent, FooterComponent, PurchaseComponent],
  templateUrl: './cart-checkout.component.html',
  styleUrl: './cart-checkout.component.css'
})
export class CartCheckoutComponent implements OnInit {
  
  protected cart : Cart[] = [];

  private cartService : CarritoService = inject(CarritoService);

  ngOnInit(): void 
  {
    if(temporalStorage.getFromStorage<Carrito>("shopping_cart") != null)
    {
      this.cart = temporalStorage.getFromStorage<Carrito>("shopping_cart").getCartEntries();
    }
    else
    {
      this.cartService.getCarrito().subscribe((rsp) => {
        if(rsp.Success)
        {
          this.cart = (rsp.Data as Cart[]);    
        }
        else
        {
          ErrorPopupComponent.throwError(rsp.Data as Error);
        }
      });
    }
  }

  getNombre(ISBN : string) : string
  {
    if(temporalStorage.getFromStorage<CartComponent>("cart_component") != null)
    {
      return temporalStorage.getFromStorage<CartComponent>("cart_component").getBookName(ISBN);
    }

    return "";
  }

  getPrecio(ISBN : string, quantity : number) : number
  {
    if(temporalStorage.getFromStorage<CartComponent>("cart_component") != null)
    {
      return temporalStorage.getFromStorage<CartComponent>("cart_component").getPrecio(ISBN, quantity);
    }

    return 0;
  }

  fixNumbers(n : number) : number
  {
    return Math.round(n * 100) / 100;
  }

  updateCart(entry : Cart, quantityMod : number)
  {
    entry.Quantity += quantityMod;

    if(entry.Quantity <= 0)
    {
      AskUserPopupComponent.askUser(
        "Eliminar libro del carrito", 
        `Deseas eliminar el libro ${temporalStorage.getFromStorage<CartComponent>("cart_component").getBookName(entry.Books_ISBN)} del carrito?`,
        "Si", 
        "No", 
        () => {
          this.cartService.deleteFromCarrito(entry).subscribe((rsp) => {
            temporalStorage.getFromStorage<Function>("resync_cart")(() => {
              this.cart = temporalStorage.getFromStorage<Carrito>("shopping_cart").getCartEntries();
            });
          });
        },
        ()=> {
          entry.Quantity++;
        }
      );
    }
    else
    {
      this.cartService.updateCarrito(entry).subscribe(()=>{
        // refetch cart entries
        temporalStorage.getFromStorage<Function>("resync_cart")(() => {
          this.cart = temporalStorage.getFromStorage<Carrito>("shopping_cart").getCartEntries();
        });
      });
    }
  }


  getPrecioTotal() : number
  {
    let precioTotal = 0;

    this.cart.forEach((element : Cart) => precioTotal += this.getPrecio(element.Books_ISBN, element.Quantity));

    return precioTotal;
  }
}
