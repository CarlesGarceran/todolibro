import { Component } from '@angular/core';
import { setDarkMode, setLightMode, toggleMode } from '../../classes/ThemeSelector'; 

@Component({
  selector: 'app-theme-selector',
  imports: [],
  templateUrl: './theme-selector.component.html',
  styleUrl: './theme-selector.component.css'
})
export class ThemeSelectorComponent {
  protected darkMode = setDarkMode;
  protected lightMode = setLightMode;
  protected toggle = toggleMode;



  private isDarkMode : boolean = false;
}
