import { Component, EventEmitter, inject, OnChanges, OnInit, Output } from '@angular/core';
import { GenericTableComponent } from '../generic/generic-table/generic-table.component';
import { Log } from '../../../../interfaces/log';
import { LoadingFieldComponent } from '../../../loading-field/loading-field.component';
import { BackendService } from '../../../../services/backend.service';
import { BackendResponse } from '../../../../interfaces/backend-response';
import { Error } from '../../../../interfaces/Error';
import { temporalStorage } from '../../../../classes/TemporalStorage';
import { ErrorPopupComponent } from '../../../popups/error-popup/error-popup.component';

@Component({
  selector: 'app-log-table',
  imports: [LoadingFieldComponent],
  templateUrl: './log-table.component.html',
  styleUrl: './log-table.component.css'
})
export class LogTableComponent extends GenericTableComponent<string, Log> implements OnInit, OnChanges {
  
  private backendService : BackendService = inject(BackendService);

  @Output("onDelete")
  public onDelete : EventEmitter<Log> = new EventEmitter<Log>();
  
  public userTable : {[id : number]: string} = [];

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

  getUsernameFromCache(id : number) : string
  {
    if(this.userTable[id] == null)
    {
      this.backendService.getUserName(id).subscribe((rsp : BackendResponse<{ id:number, username : string} | Error>) => {
        if(rsp.Success)
        {
          const resp = (rsp.Data as {id:number, username : string})
  
          if(resp.id == id)
          {
            this.userTable[id] = resp.username;
            return resp.username;
          }
          this.userTable[id] = "Id mismatch";
        }
        else
        {
          temporalStorage.getFromStorage<Function>("show_error_popup").call(
            temporalStorage.getFromStorage<ErrorPopupComponent>("error_popup"),
            rsp.Data as Error
          );
          this.userTable[id] = "Failed to GET Username";
        }

        return "Loading...";
      });
      
      return "Loading...";
    }
    else
    {
      return this.userTable[id];
    }
  }
}
