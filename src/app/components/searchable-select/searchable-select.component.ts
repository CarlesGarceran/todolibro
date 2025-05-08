import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchable-select',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './searchable-select.component.html',
  styleUrl: './searchable-select.component.css'
})
export class SearchableSelectComponent implements OnInit, OnChanges {
  @Input() options: string[] = [];
  @Input() searchTerm: string = '';
  @Output() onSelected = new EventEmitter<string>();

  selectedOption: string = '';
  filtered: string[] = [];

  ngOnInit() {
    this.updateFilteredOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm']) {
      this.updateFilteredOptions();
    }
  }

  updateFilteredOptions() {
    this.filtered = this.options.filter(option =>
      option.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    // If there's only one match, select it automatically
    if (this.filtered.length === 1) {
      this.selectedOption = this.filtered[0];
      this.onChanged(this.selectedOption);
    } else if (this.filtered.length === 0) {
      this.selectedOption = ''; // No match found
    }
  }

  onChanged(value: string) {
    console.log('Changed to:', value);
    this.onSelected.emit(value);
  }

  onChangedElement(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target?.value;
    if (value) {
      console.log('Changed to:', value);
      this.onSelected.emit(value);
    }
  }
}
