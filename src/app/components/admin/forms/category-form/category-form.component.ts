import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CategoryTableComponent } from "../../tables/category-table/category-table.component";
import { Category } from '../../../../interfaces/category';
import { LoggingService } from '../../../../services/logging.service';
import { BackendService } from '../../../../services/backend.service';
import { BackendResponse } from '../../../../interfaces/backend-response';
import { Error } from '../../../../interfaces/Error';
import { temporalStorage } from '../../../../classes/TemporalStorage';
import { ErrorPopupComponent } from '../../../popups/error-popup/error-popup.component';
import { CategoryPopupComponent } from "../../../popups/category-popup/category-popup.component";
import { GlowingTextComponent } from "../../../text/glowing-text/glowing-text.component";

@Component({
  selector: 'app-category-form',
  imports: [CategoryTableComponent, CategoryPopupComponent, GlowingTextComponent],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent implements OnInit {
  protected table_Header : string[] = [];
  protected table_Body : Category[] = [];

  private backendService : BackendService = inject(BackendService);
  private LoggingService : LoggingService = inject(LoggingService);

  @ViewChild("popupRef")
  private popupRef! : CategoryPopupComponent;

  @ViewChild("tableRef")
  private tableRef! : CategoryTableComponent;

  constructor() {
    this.table_Header.push("Id");
    this.table_Header.push("Nombre");
    this.table_Header.push("");
    this.table_Header.push("");
  }

  ngOnInit(): void {
    this.backendService.getCategories().subscribe((rsp : BackendResponse<Category[] | Error>) => {
      if(rsp.Success)
      {
        this.table_Body = (rsp.Data as Category[]);
      }
      else
      {
        const errorInstance = temporalStorage.getFromStorage<ErrorPopupComponent>("error_popup");
        const errorFunc = temporalStorage.getFromStorage<Function>("show_error_popup");

        errorFunc.call(errorInstance, (rsp.Data as Error));
      }
    });
  }

  success(mesg : string)
  {

  }

  onDelete(category : Category)
  {
    this.backendService.deleteCategory(category).subscribe((rsp)=>{
      if(!rsp.Success)
      {
        const errorInstance = temporalStorage.getFromStorage<ErrorPopupComponent>("error_popup");
        const errorFunc = temporalStorage.getFromStorage<Function>("show_error_popup");

        errorFunc.call(errorInstance, (rsp.Data as Error));
      }
    });
  }

  onAddClick()
  {
    this.popupRef.setCategory({
      CategoryId: 0,
      Name: ''
    }, this);
    this.popupRef.showPopup();
  }

  onEdit(category : Category)
  {
    this.popupRef.setCategory(category, this);
    this.popupRef.showPopup();
  }

  updateCategoria(categoria : Category, oldCategory : Category)
  {
    if(categoria.CategoryId == 0)
      {
        this.backendService.addCategory(categoria).subscribe((rsp : BackendResponse<number | Error>)=>{
          if(rsp.Success)
          {
            categoria.CategoryId = rsp.Data as number;
            this.table_Body.push(categoria);
            this.success(`added the category ${categoria.Name}`);
          }
          else
          {
            const errorInstance = temporalStorage.getFromStorage<ErrorPopupComponent>("error_popup");
            const errorFunc = temporalStorage.getFromStorage<Function>("show_error_popup");
    
            errorFunc.call(errorInstance, (rsp.Data as Error));
          }
        });
      }
      else
      {
        this.backendService.updateCategory(oldCategory?.CategoryId, categoria).subscribe((rsp : BackendResponse<{ payload: Boolean } | Error>)=>{
          if(rsp.Success)
          {
            this.success(`updated the category ${oldCategory.CategoryId}`);
          }
          else
          {
            const errorInstance = temporalStorage.getFromStorage<ErrorPopupComponent>("error_popup");
            const errorFunc = temporalStorage.getFromStorage<Function>("show_error_popup");
    
            errorFunc.call(errorInstance, (rsp.Data as Error));
          }
        });
      }
  }
}
