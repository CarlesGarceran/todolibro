import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchable-select',
  imports: [FormsModule, CommonModule],
  templateUrl: './searchable-select.component.html',
  styleUrl: './searchable-select.component.css'
})
export class SearchableSelectComponent {

  @Input()
  public options : string[] = [];
  @Output()
  public onSelected : EventEmitter<string> = new EventEmitter<string>();

  public selectedOption: string = '';
  @Input()
  public searchTerm: string = '';

  filteredOptions() {
    return this.options.filter(option =>
      option.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onChanged(event : string)
  {
    this.onSelected.emit(event);
  }
}
