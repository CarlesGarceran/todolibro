import { Component, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { GenericTableComponent } from '../../generic/generic-table/generic-table.component';
import { Log } from '../../../../../interfaces/log';
import { LoadingFieldComponent } from '../../../../loading-field/loading-field.component';

@Component({
  selector: 'app-log-table',
  imports: [LoadingFieldComponent],
  templateUrl: './log-table.component.html',
  styleUrl: './log-table.component.css'
})
export class LogTableComponent extends GenericTableComponent<string, Log> implements OnInit, OnChanges {
  
  @Output("onDelete")
  public onDelete : EventEmitter<Log> = new EventEmitter<Log>();
  
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.header = this.h_Data;
    this.table_data = this.b_Data;
  }

  ngOnChanges(): void {
    this.header = this.h_Data;
    this.table_data = this.b_Data;
  }

  updateTable(): void {
    this.header = this.h_Data;
    this.table_data = this.b_Data;
  }

  deleteFromTable(l : Log)
  {
    if(this.table_data != null)
    {
      this.table_data = this.table_data?.filter((lo : Log) => {
        return lo !== l;
      });
    }
  }

  deleteLog(log : Log)
  {
    this.onDelete.emit(log);
  }
}
