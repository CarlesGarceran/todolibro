import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-glowing-text',
  imports: [],
  templateUrl: './glowing-text.component.html',
  styleUrl: './glowing-text.component.css'
})
export class GlowingTextComponent {
  @Input()
  public textContent : string = "";
}
