import { Component, inject, Input } from '@angular/core';
import { Libro } from '../../../interfaces/libro';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-libro-entry',
  imports: [RouterLink],
  templateUrl: './libro-entry.component.html',
  styleUrl: './libro-entry.component.css'
})
export class LibroEntryComponent {
  @Input()
  public libro? : Libro;
  @Input()
  public synopsisMaxCharacters : number = 120;
  public router : Router = inject(Router);

  public forwardLink()
  {

  }

  public getTrimmedSynopsis() : string
  {
    if(this.libro == null)
      return "";

    if(this.libro?.Synopsis.length <= this.synopsisMaxCharacters)
      return this.libro.Synopsis;
    else
      return this.libro.Synopsis.substring(0, this.synopsisMaxCharacters);
  }
}
