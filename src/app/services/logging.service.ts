import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoLibroConfig } from '../todolibro.config';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor(private httpClient : HttpClient) { }

  logToServer(action : string)
  {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(TodoLibroConfig.getBackendUrl() + "/logging/log.php", JSON.stringify({
      "payload": action
    }), { "headers": headers, withCredentials: true });
  }
}
