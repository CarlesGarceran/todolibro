import { ChangeDetectorRef, Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TopbarComponent } from "../../topbar/topbar.component";
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { Libro } from '../../interfaces/libro';
import { LoadingComponent } from "../../components/loading/loading.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStore, faShoppingCart, faHeart, faBook } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-libro',
  imports: [TopbarComponent, LoadingComponent, FontAwesomeModule],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})
export class LibroComponent implements OnInit {
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private backendService: BackendService = inject(BackendService);
  private ISBN: number = -1;

  private changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);

  protected libro?: Libro;
  protected storeIcon = faStore;
  protected shoppingCartIcon = faShoppingCart;
  protected wishListIcon = faHeart;
  protected shelveIcon = faBook;

  ngOnInit(): void {
    this.ISBN = this.route.snapshot.params['isbn'];

    this.backendService.getLibro(this.ISBN).subscribe((l: Libro) => {
      console.log("Got libro");
      console.log(l.Name);

      var lx = l;

      lx.Price = this.fixNumbers(l.Price);

      this.libro = lx;
    });
  }

  fixNumbers(n : number) : number
  {
    return parseFloat(n + "");
  }
}
