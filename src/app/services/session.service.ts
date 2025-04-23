import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoLibroConfig } from '../todolibro.config';
import { Observable } from 'rxjs';
import { Error } from '../interfaces/Error';
import { BackendResponse } from '../interfaces/backend-response';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private httpClient : HttpClient) { }

  loginUser(obj : { email : string, password : string }) : Observable<Object>
    {
      var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.httpClient.post(TodoLibroConfig.getBackendUrl() + "/login/checkLogin.php", JSON.stringify(obj),
      {
        "headers": headers,
        withCredentials: true
      });
    }
  
    registerUser(obj: { name: string, email: string, password: string }): Observable<BackendResponse<any | Error>> {
      var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.httpClient.post<BackendResponse<any | Error>>(TodoLibroConfig.getBackendUrl() + "/register/", JSON.stringify(obj),
        {
          "headers": headers,
          withCredentials: true
        });
    }
  
    logout() {
      var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.httpClient.post(TodoLibroConfig.getBackendUrl() + "/logout.php", {}, {
        "headers": headers,
        withCredentials: true
      });
    }
}
