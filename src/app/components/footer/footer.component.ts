import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit, OnChanges {

  protected isOverflowing : boolean = false;

  ngOnInit(): void {
    this.checkOverflows(); 
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkOverflows();
  }

  checkOverflows()
  {
    const element = document.body;
    this.isOverflowing = element.scrollHeight > element.clientHeight;


  }
}
