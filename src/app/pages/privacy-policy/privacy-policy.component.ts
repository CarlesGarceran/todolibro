import { Component } from '@angular/core';
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-privacy-policy',
  imports: [TopbarComponent, FooterComponent],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css'
})
export class PrivacyPolicyComponent {

}
