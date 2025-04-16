import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Category } from '../../../interfaces/category';
import { CategoryFormComponent } from '../../admin/forms/category-form/category-form.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-popup',
  imports: [FormsModule],
  templateUrl: './category-popup.component.html',
  styleUrl: './category-popup.component.css'
})
export class CategoryPopupComponent implements AfterViewInit, OnInit {
  private visible : boolean = false;

  @ViewChild("modalHandler", { static: false })
  protected modalHandler? : ElementRef<HTMLInputElement>;
  
  @Input()
  public popupTitle : string = "";

  protected local_category : Category = {
    CategoryId: 0,
    Name: ""
  };

  private categoryFormComponent! : CategoryFormComponent;
  protected categoriaPtr : Category = {
    CategoryId: 0,
    Name: ""
  };


  ngOnInit(): void {
    
  }

  constructor() {
    
  }

  setCategory(categoria : Category, formComponent : CategoryFormComponent)
  {
    this.local_category = categoria;
    this.categoryFormComponent = formComponent;
   
    if(this.local_category.CategoryId == 0)
    {
      this.popupTitle = "Añadir Categoria";
    }
    else
    {
      this.popupTitle = "Editando Categoría: " + this.local_category.Name;
    }

    Object.assign(this.categoriaPtr, categoria);
  }

  setVisible(value : boolean)
  {
    this.visible = value;
  }

  ngAfterViewInit(): void 
  {
    if(this.modalHandler != null && this.visible)
    {
      console.log("Showing popup");
      this.modalHandler?.nativeElement.click();
    }
  }

  showPopup()
  {
    if(this.visible == true) return;

    this.modalHandler?.nativeElement.click();
    this.visible = true;
  }

  hidePopup()
  {
    if(this.visible == false) return;

    this.modalHandler?.nativeElement.click();
    this.visible = false;
  }

  descartarCambios()
  {
    this.local_category = this.categoriaPtr;
    this.hidePopup();
  }

  saveInstance()
  {
    if(this.local_category != null)
    {
      this.categoryFormComponent.updateCategoria(this.local_category, this.categoriaPtr);
    }
    this.hidePopup();
  }

}
