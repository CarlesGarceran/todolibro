import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../interfaces/user';
import { RouterModule } from '@angular/router';
import { BackendService } from '../../../services/backend.service';
import { SidebarSelection } from '../../../enums/SidebarSelection';
import { AddLibroFormComponent } from "../forms/add-libro-form/add-libro-form.component";
import { LogFormComponent } from "../forms/log-form/log-form.component";
import { ThemeSelectorComponent } from "../../theme-selector/theme-selector.component";
import { CategoryFormComponent } from "../forms/category-form/category-form.component";
import { FileUploaderComponent } from "../forms/file-uploader/file-uploader.component";
import { AddAuthorFormComponent } from "../forms/add-author-form/add-author-form.component";
import { AddPublisherFormComponent } from "../forms/add-publisher-form/add-publisher-form.component";
import { CategorizeFormComponent } from "../forms/categorize-form/categorize-form.component";

@Component({
  selector: 'app-admin-sidebar',
  imports: [AddLibroFormComponent, LogFormComponent, ThemeSelectorComponent, CategoryFormComponent, FileUploaderComponent, AddAuthorFormComponent, AddPublisherFormComponent, CategorizeFormComponent, RouterModule],
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
