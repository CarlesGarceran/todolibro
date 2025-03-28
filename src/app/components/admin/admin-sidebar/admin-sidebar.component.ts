import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../interfaces/user';
import { BackendService } from '../../../services/backend.service';
import { SidebarSelection } from '../../../enums/SidebarSelection';
import { AddLibroFormComponent } from "../forms/add-libro-form/add-libro-form.component";
import { LogFormComponent } from "../forms/log-form/log-form.component";

@Component({
  selector: 'app-admin-sidebar',
  imports: [AddLibroFormComponent, LogFormComponent],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})

export class AdminSidebarComponent implements OnInit {

  @Input("userProfile")
  public user? : User;
  @Input("opLevel")
  public opLevel : number = 0;

  @Output("returnToSite")
  public returnToSite : EventEmitter<void> = new EventEmitter();

  protected permissonLevel : string = "None";
  private backendService : BackendService = inject(BackendService);
  protected selectedMode : SidebarSelection = SidebarSelection.None;

  constructor() 
  {
  }

  ngOnInit(): void 
  {  
    this.backendService.getRoleName(this.opLevel).subscribe((rName : string)=>{
      this.permissonLevel = rName;
    })
  }

  public HasAccess(opLevel : number) : boolean
  {
    return this.opLevel >= opLevel;
  }


  public setSelected(selection  : SidebarSelection)
  {
    this.selectedMode = selection;
  }
}
