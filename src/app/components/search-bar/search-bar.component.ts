import { Component, inject } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { FormsModule } from '@angular/forms';
import { Libro } from '../../interfaces/libro';


@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent 
{
  public inputText? : string;
  public selectFilter? : string;

  private backendService : BackendService = inject(BackendService);

  search()
  {
    console.log(this.inputText);
    console.log(this.selectFilter);

    this.backendService.filterForQuery({
      input: this.inputText,
      category: this.selectFilter
    }).subscribe((results: Libro[]) => {
      
    });
  }
}
