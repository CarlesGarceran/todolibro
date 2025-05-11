import { AfterViewInit, Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { CategorizedBook } from '../../../interfaces/categorized-book';
import { CategorizeFormComponent } from '../../admin/forms/categorize-form/categorize-form.component';
import { BackendService } from '../../../services/backend.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchableSelectComponent } from "../../searchable-select/searchable-select.component";
import { Category } from '../../../interfaces/category';

@Component({
  selector: 'app-categorize-popup',
  imports: [FormsModule, CommonModule, SearchableSelectComponent],
  templateUrl: './categorize-popup.component.html',
  styleUrl: './categorize-popup.component.css'
})
export class CategorizePopupComponent implements AfterViewInit, OnInit {
  @Input()
  public popupTitle: string = "";

  @ViewChild("modalHandler", { static: false })
  protected modalHandler?: ElementRef<HTMLInputElement>;
  @ViewChild("selectableHandler", { static: false })
  protected selectableSearch!: SearchableSelectComponent;

  protected local_category: CategorizedBook = {
    isbn: '',
    categories: []
  };

  protected options: string[] = [];

  protected categoriaPtr: CategorizedBook = {
    isbn: '',
    categories: []
  };


  private visible: boolean = false;
  private categories: Category[] = [];
  private categoryFormComponent!: CategorizeFormComponent;
  private backendService: BackendService = inject(BackendService);

  ngOnInit(): void {

  }

  constructor() {

  }

  setCategorizedBook(categoria: CategorizedBook, formComponent: CategorizeFormComponent) {
    this.local_category = categoria;
    this.categoryFormComponent = formComponent;

    this.backendService.getLibro(categoria.isbn).subscribe(rsp => {
      this.popupTitle = "Categorizando Libro: " + rsp.Name;
    })

    this.backendService.getCategories().subscribe(rsp => {
      if (rsp.Success) {
        this.parseCategories(rsp.Data as Category[]);
      }
    })

    Object.assign(this.categoriaPtr, categoria);
  }

  setVisible(value: boolean) {
    this.visible = value;
  }

  ngAfterViewInit(): void {
    if (this.modalHandler != null && this.visible) {
      console.log("Showing popup");
      this.modalHandler?.nativeElement.click();
    }
  }

  showPopup() {
    if (this.visible == true) return;

    this.modalHandler?.nativeElement.click();
    this.visible = true;
  }

  hidePopup() {
    if (this.visible == false) return;

    this.modalHandler?.nativeElement.click();
    this.visible = false;
  }

  descartarCambios() {
    this.local_category = this.categoriaPtr;
    this.hidePopup();
  }

  saveInstance() {
    if (this.local_category != null) {
      this.categoryFormComponent.updateCategories(this.local_category);
    }
    this.hidePopup();
  }

  onDelete(index: number) {
    this.local_category.categories.splice(index, 1);
  }

  getCategory(categoryName: string): Category | undefined {
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].CategoryId + " - " + this.categories[i].Name == categoryName)
        return this.categories[i];
    }

    return undefined;
  }

  hasCategory(cat: Category, array : Category[]): boolean {
    var hasCategory : boolean = false;

    array.filter((entry) => {
      if (entry.CategoryId == cat.CategoryId) {
        hasCategory = true;
      }
    });


    return hasCategory;
  }

  onSelected(arg: string) {
    var category = this.getCategory(arg);

    if (category != null && !this.hasCategory(category, this.local_category.categories)) {
      this.local_category.categories.push(category);
    }
    else {
      console.error("Category not found");
    }
  }

  private parseCategories(categories: Category[]) {
    this.categories = categories;

    for (let i = 0; i < this.options.length; i++) {
      this.options.pop();
    }

    categories.forEach((element) => {
      this.options.push(element.CategoryId + " - " + element.Name);
    });
  }

}