import { Component } from '@angular/core';
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-purchase',
  imports: [TopbarComponent, FooterComponent],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent {

}
