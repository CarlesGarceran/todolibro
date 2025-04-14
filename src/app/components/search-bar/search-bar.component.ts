import { Component, inject } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { FormsModule } from '@angular/forms';
import { Libro } from '../../interfaces/libro';
import { BackendResponse } from '../../interfaces/backend-response';
import { Router } from '@angular/router';
import { Error } from '../../interfaces/Error';
import { temporalStorage } from '../../classes/TemporalStorage';
import { ErrorPopupComponent } from '../popups/error-popup/error-popup.component';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  public inputText: string = "";
  public selectFilter: string = "Nombre";

  private router: Router = inject(Router);
  private backendService: BackendService = inject(BackendService);

  search() {
    this.router.navigate(['/filter/', this.selectFilter, this.inputText]);
  }
}
