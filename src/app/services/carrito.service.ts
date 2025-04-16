import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendResponse } from '../interfaces/backend-response';
import { Cart } from '../interfaces/Cart';
import { Error } from '../interfaces/Error';
import { TodoLibroConfig } from '../todolibro.config';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private httpClient : HttpClient) { }

  getCarrito() : Observable<BackendResponse<Cart[] | Error>>
  {
    var headers : HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get<BackendResponse<Cart[] | Error>>(TodoLibroConfig.getBackendUrl() + "/cart/", {
      headers: headers,
      withCredentials: true
    });
  }

  addToCarrito(carritoEntry : Cart) : Observable<BackendResponse<any | Error>>
  {
    var headers : HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<BackendResponse<any | Error>>(TodoLibroConfig.getBackendUrl() + "/cart/", JSON.stringify(carritoEntry), {
      headers: headers,
      withCredentials: true
    });
  }

  updateCarrito(carritoEntry : Cart)
  {
    var headers : HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put<BackendResponse<any | Error>>(TodoLibroConfig.getBackendUrl() + "/cart/", JSON.stringify(carritoEntry), {
      headers: headers,
      withCredentials: true
    });
  }

  deleteFromCarrito(carritoEntry : Cart)
  {
    var headers : HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.delete<BackendResponse<any | Error>>(TodoLibroConfig.getBackendUrl() + "/cart/", {
      headers: headers,
      body: JSON.stringify(carritoEntry),
      withCredentials: true
    });
  }

  hasInCarrito(ISBN : string, entries : Cart[]) : boolean
  {
    for(let i = 0; i < entries.length; i++)
    {
      if(entries[i].Books_ISBN == ISBN)
        return true;
    }
    return false;
  }

  getFromCarrito(ISBN : string, entries : Cart[]) : Cart | null
  {
    for(let i = 0; i < entries.length; i++)
      {
        if(entries[i].Books_ISBN == ISBN)
          return entries[i];
      }

    return null;
  }
}
