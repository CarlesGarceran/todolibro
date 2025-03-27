import { Component, Input, OnInit } from '@angular/core';
import { TableData } from '../../../../../classes/TableData';

@Component({
  selector: 'app-generic-table',
  imports: [],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.css'
})
export abstract class GenericTableComponent<T, K> extends TableData<T[], K[]>
{
  @Input("header")
  public h_Data : T[] = [];
  @Input("body")
  public b_Data : K[] = [];

  constructor() 
  {
    super();

    this.header = this.h_Data;
    this.table_data = this.b_Data;
  }
}
