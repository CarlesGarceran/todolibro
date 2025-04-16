import { Component, inject, Inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SiteConfigService } from './services/siteconfig.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { ErrorPopupComponent } from "./components/popups/error-popup/error-popup.component";
import { FormsModule } from '@angular/forms';
import { routes } from './app.routes';
import { temporalStorage } from './classes/TemporalStorage';
import { Carrito } from './classes/Carrito';
import { AskUserPopupComponent } from "./components/popups/ask-user-popup/ask-user-popup.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FontAwesomeModule, ErrorPopupComponent, FormsModule, AskUserPopupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'client';

  private siteconfigService: SiteConfigService = inject(SiteConfigService);

  ngOnInit(): void 
  {
    console.log(" __   __    _______    _______        __   __    _______    _______                                                                                                                   ");
    console.log("|  | |  |  |       |  |       |      |  | |  |  |       |  |       |                                                                                                                  ");
    console.log("|  |_|  |  |   _   |  |   _   |      |  |_|  |  |   _   |  |   _   |                                                                                                                  ");
    console.log("|       |  |  | |  |  |  | |  |      |       |  |  | |  |  |  | |  |                                                                                                                  ");
    console.log("|       |  |  |_|  |  |  |_|  |      |       |  |  |_|  |  |  |_|  |                                                                                                                  ");
    console.log("|   _   |  |       |  |       |      |   _   |  |       |  |       |                                                                                                                  ");
    console.log("|__| |__|  |_______|  |_______|      |__| |__|  |_______|  |_______|                                                                                                                  ");
    console.log("                                                                                                                                                                                      ");
    console.log("                                                                                                                                                                                      ");
    console.log("                                                                                                                                                                                      ");
    console.log("                                                                                                                                                                                      ");
    console.log("                                                                                                                                                                                      ");
    console.log("                                                                                                                                                                                      ");
    console.log("                                                                                                                                                                                      ");
    console.log(" _     _  __   __  _______  _______      _______  ______    _______      __   __  _______  __   __      _______  _______  _______  ______    _______  __   __  ___   __    _  _______ ");
    console.log("| | _ | ||  | |  ||   _   ||       |    |   _   ||    _ |  |       |    |  | |  ||       ||  | |  |    |       ||       ||   _   ||    _ |  |       ||  | |  ||   | |  |  | ||       |");
    console.log("| || || ||  |_|  ||  |_|  ||_     _|    |  |_|  ||   | ||  |    ___|    |  |_|  ||   _   ||  | |  |    |  _____||    ___||  |_|  ||   | ||  |       ||  |_|  ||   | |   |_| ||    ___|");
    console.log("|       ||       ||       |  |   |      |       ||   |_||_ |   |___     |       ||  | |  ||  |_|  |    | |_____ |   |___ |       ||   |_||_ |       ||       ||   | |       ||   | __ ");
    console.log("|       ||       ||       |  |   |      |       ||    __  ||    ___|    |_     _||  |_|  ||       |    |_____  ||    ___||       ||    __  ||      _||       ||   | |  _    ||   ||  |");
    console.log("|   _   ||   _   ||   _   |  |   |      |   _   ||   |  | ||   |___       |   |  |       ||       |     _____| ||   |___ |   _   ||   |  | ||     |_ |   _   ||   | | | |   ||   |_| |");
    console.log("|__| |__||__| |__||__| |__|  |___|      |__| |__||___|  |_||_______|      |___|  |_______||_______|    |_______||_______||__| |__||___|  |_||_______||__| |__||___| |_|  |__||_______|");
    console.log(" __   __  _______  ______    _______            _______  _______  ___   ___   ___   ___   ___   ___   ___   ___   ______                                                              ");
    console.log("|  | |  ||       ||    _ |  |       |          |  _    ||       ||   | |   | |   | |   | |   | |   | |   | |   | |      |                                                             ");
    console.log("|  |_|  ||    ___||   | ||  |    ___|          | |_|   ||   _   ||   | |   | |   | |   | |   | |   | |   | |   | |___   |                                                             ");
    console.log("|       ||   |___ |   |_||_ |   |___           |       ||  | |  ||   | |   | |   | |   | |   | |   | |   | |   |   __|  |                                                             ");
    console.log("|       ||    ___||    __  ||    ___| ___      |  _   | |  |_|  ||   | |   | |   | |   | |   | |   | |   | |   |  |_____|                                                             ");
    console.log("|   _   ||   |___ |   |  | ||   |___ |_  |     | |_|   ||       ||   | |   | |   | |   | |   | |   | |   | |   |    __                                                                ");
    console.log("|__| |__||_______||___|  |_||_______|  |_|     |_______||_______||___| |___| |___| |___| |___| |___| |___| |___|   |__|                                                               ");
  }
}
