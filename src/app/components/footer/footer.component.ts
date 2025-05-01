import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit, OnDestroy {
  protected isOverflowing: boolean = false;
  private intervalId: any;

  checkOverflow(): boolean {
    return document.documentElement.scrollHeight > window.innerHeight;
  }

  ngOnInit(): void {
    this.intervalId = setInterval(() => this.checkOverflows(), 100);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  checkOverflows(): void {
    this.isOverflowing = this.checkOverflow();
  }
}
