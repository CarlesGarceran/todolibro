import { Injectable } from '@angular/core';
import { SiteConfigService } from './siteconfig.service';
import { TodoLibroConfig } from '../todolibro.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { Libro } from '../interfaces/libro';
import { Author } from '../interfaces/author';
import { Publisher } from '../interfaces/publisher';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  cookie: string = "";

  constructor(private httpClient: HttpClient) {

  }

  getLibros(limit : number = -1): Observable<Libro[]> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<any>(TodoLibroConfig.getBackendUrl() + `/getAllLibros.php?limit=${limit}`, null,
      {
        "headers": headers,
        withCredentials: true
      }).pipe(map(response => {
        var libros: Libro[] = [];

        response.payload.forEach((element: any) => {

          var libro: Libro =
          {
            ISBN: element["ISBN"],
            Name: element["Name"],
            Author: element["AuthorId"],
            Publisher: element["PublisherId"],
            Image: element["ImageUrl"],
            LaunchDate: new Date(element["LaunchDate"]["date"]),
            Price: element['Price']
          };

          libros.push(libro);
        });

        return libros;
      }));
  }

  getAuthor(authorId : number) : Observable<Author> 
  {
    return this.httpClient.get<Author>(TodoLibroConfig.getBackendUrl() + `/author/getById.php?authorId=${authorId}`, {});
  }

  getPublisher(publisherId : number) : Observable<Publisher> 
  {
    return this.httpClient.get<Publisher>(TodoLibroConfig.getBackendUrl() + `/publisher/getById.php?publisherId=${publisherId}`, {});
  }

  getUserData(): Observable<User> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<{ id: number, username: string, email: string, profile_picture: string }>(TodoLibroConfig.getBackendUrl() + "/user/getUserInfo.php", {
      "headers": headers,
    },
      {
        withCredentials: true
      }).pipe(map(response => {
        var usr: User = {
          id: response.id,
          email: response.email,
          profile_picture: response.profile_picture,
          username: response.username
        }

        return usr;
      }));
  }

  getUserRole(): Observable<number> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<{ RoleId: number }>(TodoLibroConfig.getBackendUrl() + "/roles/getMaxRole.php", {
      "headers": headers,
    },
      {
        withCredentials: true
      }).pipe(map(response => {
        return response.RoleId;
      }));
  }

  testGetSession(): Observable<string> {
    return this.httpClient.post<{ RSP: string }>(TodoLibroConfig.getBackendUrl() + "/test/sessionGetTest.php", {}, {
      withCredentials: true
    }).pipe(map(response => response.RSP));
  }

  getRoleName(roleId : number) : Observable<string>
  {
    return this.httpClient.get<{RoleName : string;}>(TodoLibroConfig.getBackendUrl() + `/roles/getRoleName.php?roleId=${roleId}`, {}).pipe(map(response => response.RoleName));
  }

  filterForQuery(arg: { input?: string, category?: string }): Observable<Libro[]> {
    return this.httpClient.post<Libro[]>(TodoLibroConfig.getBackendUrl() + "/filter/filter.php", JSON.stringify(arg),
      {
        withCredentials: false
      });
  }
}
