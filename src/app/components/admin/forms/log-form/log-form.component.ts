import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { LogTableComponent } from "../../tables/log-table/log-table.component";
import { Log } from '../../../../interfaces/log';
import { BackendService } from '../../../../services/backend.service';

@Component({
  selector: 'app-log-form',
  imports: [LogTableComponent],
  templateUrl: './log-form.component.html',
  styleUrl: './log-form.component.css'
})
export class LogFormComponent implements OnInit {
  protected table_Header : string[] = [];
  protected table_Body : Log[] = [];

  private backendService : BackendService = inject(BackendService);

  @ViewChild("tableRef")
  private tableRef! : LogTableComponent;

  ngOnInit(): void {
    this.backendService.getLogs().subscribe((l : Log[]) => {
      this.table_Body = l;
      this.tableRef?.updateTable();
    });
  }

  constructor() {
    this.table_Header.push("Usuario");
    this.table_Header.push("Acción");
    this.table_Header.push("Fecha");
    this.table_Header.push("");
  }

  deleteEntry(LogIdx : Log)
  {
    this.backendService.deleteLog(LogIdx).subscribe((obj : any)=>{
      if(obj['error_code'])
      {

      }
      else
      {
        this.tableRef.deleteFromTable(LogIdx);
      }
    });
  }
}
