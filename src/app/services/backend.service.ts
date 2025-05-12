import { Injectable } from '@angular/core';
import { TodoLibroConfig } from '../todolibro.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { Libro } from '../interfaces/libro';
import { Author } from '../interfaces/author';
import { Publisher } from '../interfaces/publisher';
import { Log } from '../interfaces/log';
import { BackendResponse } from '../interfaces/backend-response';
import { Error } from '../interfaces/Error';
import { Category } from '../interfaces/category';
import { Review } from '../interfaces/review';
import { FormUser } from '../pages/config/config.component';
import { PurchaseDetails } from '../interfaces/purchase-details';
import { CategorizedBook } from '../interfaces/categorized-book';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  cookie: string = "";

  constructor(private httpClient: HttpClient) {

  }

  //#region LIBROS

  getLibros(limit: number = -1): Observable<Libro[]> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<any>(TodoLibroConfig.getBackendUrl() + `/books/getAllLibros.php?limit=${limit}`, null,
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
            Price: element['Price'],
            Synopsis: element['Synopsis'],
            Stock: element['Stock']
          };

          libros.push(libro);
        });

        return libros;
      }));
  }

  getLibro(ISBN: string): Observable<Libro> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<Libro>(TodoLibroConfig.getBackendUrl() + `/book/getByISBN.php`, JSON.stringify({
      isbn: ISBN
    }),
      {
        "headers": headers,
        withCredentials: true
      });
  }

  getLibrosByFilter(filterType: string, content: string): Observable<BackendResponse<Libro[]>> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<BackendResponse<Libro[]>>(TodoLibroConfig.getBackendUrl() + `/filter/?filterType=${filterType}`, JSON.stringify({
      content: content
    }),
      {
        "headers": headers,
        withCredentials: false
      });
  }

  getLibroCount(): Observable<BackendResponse<{ payload: number } | Error>> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get<BackendResponse<{ payload: number } | Error>>(TodoLibroConfig.getBackendUrl() + `/books/getBooksCount.php`,
      {
        headers: headers,
        withCredentials: false
      });
  }

  getLibrosByPublisher(publisher: number): Observable<BackendResponse<Libro[] | Error>> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get<BackendResponse<Libro[] | Error>>(TodoLibroConfig.getBackendUrl() + `/books/getBooksByPublisher.php?publisherId=${publisher}`,
      {
        headers: headers,
        withCredentials: false,
      });
  }

  getLibrosByAuthor(author: number): Observable<BackendResponse<Libro[] | Error>> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get<BackendResponse<Libro[] | Error>>(TodoLibroConfig.getBackendUrl() + `/books/getBooksByAuthor.php?authorId=${author}`,
      {
        headers: headers,
        withCredentials: false,
      });
  }

  getLibrosMasCompradosByAuthor(author: number): Observable<BackendResponse<Libro[] | Error>> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get<BackendResponse<Libro[] | Error>>(TodoLibroConfig.getBackendUrl() + `/books/most_purchased/author/?authorId=${author}`,
      {
        headers: headers,
        withCredentials: false,
      });
  }

  getLibrosMasCompradosByPublisher(publisher: number): Observable<BackendResponse<Libro[] | Error>> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get<BackendResponse<Libro[] | Error>>(TodoLibroConfig.getBackendUrl() + `/books/most_purchased/publisher/?publisherId=${publisher}`,
      {
        headers: headers,
        withCredentials: false,
      });
  }

  getLibrosMasComprados(): Observable<BackendResponse<Libro[] | Error>> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get<BackendResponse<Libro[] | Error>>(TodoLibroConfig.getBackendUrl() + `/books/most_purchased/`,
      {
        headers: headers,
        withCredentials: false,
      });
  }

  updateLibro(ISBN: string, libro: Libro): Observable<BackendResponse<{ payload: Boolean } | Error>> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put<BackendResponse<{ payload: Boolean } | Error>>(TodoLibroConfig.getBackendUrl() + `/books/?ISBN=${ISBN}`, JSON.stringify(libro), {
      headers: headers,
      withCredentials: true
    })
  }

  addLibro(libro: Libro): Observable<BackendResponse<{ payload: boolean } | Error>> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<BackendResponse<{ payload: boolean } | Error>>(TodoLibroConfig.getBackendUrl() + '/books/', JSON.stringify(libro), {
      headers: headers,
      withCredentials: true
    })
  }

  deleteLibro(libro: Libro): Observable<BackendResponse<{ payload: Boolean } | Error>> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.delete<BackendResponse<{ payload: Boolean } | Error>>(TodoLibroConfig.getBackendUrl() + `/books/`, {
      headers: headers,
      body: JSON.stringify(libro),
      withCredentials: true
    })
  }

  //#endregion

  //#region CATEGORIES

  getCategories(): Observable<BackendResponse<Category[] | Error>> {
    return this.httpClient.get<BackendResponse<Category[] | Error>>(TodoLibroConfig.getBackendUrl() + `/categories/`, {});
  }

  deleteCategory(category: Category): Observable<BackendResponse<{ payload: Boolean } | Error>> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.delete<BackendResponse<{ payload: Boolean } | Error>>(TodoLibroConfig.getBackendUrl() + `/categories/`, {
      headers: headers,
      body: JSON.stringify(category),
      withCredentials: true
    })
  }

  updateCategory(categoryId: number, category: Category) {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put<BackendResponse<{ payload: Boolean } | Error>>(TodoLibroConfig.getBackendUrl() + `/categories/?CategoryId=${categoryId}`, JSON.stringify(category), {
      headers: headers,
      withCredentials: true
    })
  }

  addCategory(category: Category) {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<BackendResponse<number | Error>>(TodoLibroConfig.getBackendUrl() + '/categories/', JSON.stringify(category), {
      headers: headers,
      withCredentials: true
    })
  }

  getCategorizedBooks() : Observable<BackendResponse<CategorizedBook[] | Error>>
  {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get<BackendResponse<CategorizedBook[] | Error>>(
      TodoLibroConfig.getBackendUrl() + '/categorize/',
      {
        headers: headers,
        withCredentials: true
      });
  }

  getCategorizedBook(ISBN : string) : Observable<BackendResponse<CategorizedBook | Error>>
  {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get<BackendResponse<CategorizedBook | Error>>(
      TodoLibroConfig.getBackendUrl() + `/categorize/?isbn=${ISBN}`,
      {
        headers: headers,
        withCredentials: true
      });
  }

  categorizeBook(categorizedBook : CategorizedBook) : Observable<BackendResponse<any | Error>>
  {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<BackendResponse<any | Error>>(
      TodoLibroConfig.getBackendUrl() + `/categorize/`,
      JSON.stringify(categorizedBook),
      {
        headers: headers,
        withCredentials: true
      });
  }

  //#endregion

  //#region FAVORITES

  getFavorites(): Observable<BackendResponse<Libro[] | Error>> {
    return this.httpClient.get<BackendResponse<Libro[] | Error>>(TodoLibroConfig.getBackendUrl() + `/favorites/`, { withCredentials: true });
  }

  addToFavorites(libro: Libro): Observable<BackendResponse<any | Error>> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<BackendResponse<any | Error>>(TodoLibroConfig.getBackendUrl() + `/favorites/`, JSON.stringify(libro), { withCredentials: true, headers: headers });
  }

  deleteFromFavorites(libro: Libro): Observable<BackendResponse<any | Error>> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.delete<BackendResponse<any | Error>>(TodoLibroConfig.getBackendUrl() + `/favorites/`, { withCredentials: true, headers: headers, body: JSON.stringify(libro) });
  }

  //#endregion

  //#region AUTHORS

  getAuthors(): Observable<BackendResponse<Author[] | Error>> {
    return this.httpClient.get<BackendResponse<Author[] | Error>>(TodoLibroConfig.getBackendUrl() + `/authors/`, {});
  }

  getAuthor(authorId: number): Observable<BackendResponse<Author | Error>> {
    return this.httpClient.get<BackendResponse<Author | Error>>(TodoLibroConfig.getBackendUrl() + `/author/getById.php?authorId=${authorId}`, {});
  }

  addAuthor(author: Author): Observable<BackendResponse<Number | Error>> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<BackendResponse<Number | Error>>(TodoLibroConfig.getBackendUrl() + `/authors/`, JSON.stringify(author),
      {
        headers: headers,
        withCredentials: true
      });
  }

  updateAuthor(authorId: number, author: Author): Observable<BackendResponse<any | Error>> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put<BackendResponse<Author | Error>>(TodoLibroConfig.getBackendUrl() + `/authors/?id=${authorId}`, JSON.stringify(author),
      {
        headers: headers,
        withCredentials: true
      });
  }

  deleteAuthor(authorId: number): Observable<BackendResponse<Number | Error>> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.delete<BackendResponse<Number | Error>>(TodoLibroConfig.getBackendUrl() + `/authors/?id=${authorId}`,
      {
        headers: headers,
        withCredentials: true
      });
  }

  //#endregion

  //#region PUBLISHERS

  getPublisher(publisherId: number): Observable<BackendResponse<Publisher | Error>> {
    return this.httpClient.get<any>(TodoLibroConfig.getBackendUrl() + `/publisher/getById.php?publisherId=${publisherId}`, {});
  }

  getPublishers(): Observable<BackendResponse<Publisher[] | Error>> {
    return this.httpClient.get<BackendResponse<Publisher[] | Error>>(TodoLibroConfig.getBackendUrl() + `/publishers/`, {});
  }

  addPublisher(publisher: Publisher): Observable<BackendResponse<Number | Error>> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<BackendResponse<Number | Error>>(TodoLibroConfig.getBackendUrl() + `/publishers/`, JSON.stringify(publisher), {
      headers: headers,
      withCredentials: true
    });
  }

  updatePublisher(publisherId: number, publisher: Publisher): Observable<BackendResponse<any | Error>> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put<BackendResponse<any | Error>>(TodoLibroConfig.getBackendUrl() + `/publishers/?id=${publisherId}`, JSON.stringify(publisher),
      {
        headers: headers,
        withCredentials: true
      });
  }

  deletePublisher(publisherId: number): Observable<BackendResponse<any | Error>> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.delete<any>(TodoLibroConfig.getBackendUrl() + `/publishers/?id=${publisherId}`, {
      headers: headers,
      withCredentials: true
    });
  }

  //#endregion

  //#region USER

  getUserData(): Observable<BackendResponse<User | Error>> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<BackendResponse<User | Error>>(TodoLibroConfig.getBackendUrl() + "/user/getUserInfo.php", {
      "headers": headers,
    },
      {
        withCredentials: true
      });
  }

  getUserDataById(userId: number): Observable<BackendResponse<{ userId: number, Name: string, ProfilePicture: string, Email: string, PasswordHash: string } | Error>> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get<BackendResponse<{ userId: number, Name: string, ProfilePicture: string, Email: string, PasswordHash: string } | Error>>(TodoLibroConfig.getBackendUrl() + `/user/getUserInfoById.php?userId=${userId}`, {
      "headers": headers,
    });
  }

  getUserName(userId: number): Observable<BackendResponse<{ id: number, username: string } | Error>> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get<BackendResponse<{ id: number, username: string } | Error>>(TodoLibroConfig.getBackendUrl() + `/user/getUserName.php?userId=${userId}`,
      {
        withCredentials: false
      });
  }

  updateUser(formUser: FormUser): Observable<BackendResponse<any | Error>> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put<BackendResponse<any | Error>>(TodoLibroConfig.getBackendUrl() + `/user/`, JSON.stringify(formUser),
      {
        withCredentials: true
      });
  }

  //#endregion

  testGetSession(): Observable<string> {
    return this.httpClient.post<{ RSP: string }>(TodoLibroConfig.getBackendUrl() + "/test/sessionGetTest.php", {}, {
      withCredentials: true
    }).pipe(map(response => response.RSP));
  }

  //#region ROLES

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

  getRoleName(roleId: number): Observable<string> {
    return this.httpClient.get<{ RoleName: string; }>(TodoLibroConfig.getBackendUrl() + `/roles/getRoleName.php?roleId=${roleId}`, {}).pipe(map(response => response.RoleName));
  }

  //#endregion

  //#region REVIEWS

  getReviews(ISBN: string): Observable<BackendResponse<Review[] | Error>> {
    return this.httpClient.get<BackendResponse<Review[] | Error>>(TodoLibroConfig.getBackendUrl() + `/reviews/?isbn=${ISBN}`, {});
  }

  getReview(ISBN: string, userId: number): Observable<BackendResponse<Review | Error>> {
    return this.httpClient.get<BackendResponse<Review | Error>>(TodoLibroConfig.getBackendUrl() + `/review/?isbn=${ISBN}&userId=${userId}`, {});
  }

  getMyReview(ISBN: string): Observable<BackendResponse<Review | Error>> {
    return this.httpClient.get<BackendResponse<Review | Error>>(TodoLibroConfig.getBackendUrl() + `/review/getMyReview.php?isbn=${ISBN}`, { withCredentials: true });
  }

  addReview(review: Review): Observable<BackendResponse<any | Error>> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<BackendResponse<any | Error>>(TodoLibroConfig.getBackendUrl() + `/reviews/`, JSON.stringify(review), {
      headers: headers,
      withCredentials: true
    });
  }

  updateReview(ISBN: string, review: Review): Observable<BackendResponse<any | Error>> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put<BackendResponse<any | Error>>(TodoLibroConfig.getBackendUrl() + `/reviews/?isbn=${ISBN}`, JSON.stringify(review), {
      headers: headers,
      withCredentials: true
    });
  }

  deleteReview(ISBN: string): Observable<BackendResponse<any | Error>> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.delete<BackendResponse<any | Error>>(TodoLibroConfig.getBackendUrl() + `/reviews/?isbn=${ISBN}`, {
      headers: headers,
      withCredentials: true
    });
  }

  //#region RATING

  getRating(ISBN: string): Observable<BackendResponse<{ rating: number } | Error>> {
    return this.httpClient.get<BackendResponse<{ rating: number } | Error>>(TodoLibroConfig.getBackendUrl() + `/reviews/rating/?isbn=${ISBN}`, {});
  }

  //#endregion

  //#endregion

  //#region LOGS

  getLogs(): Observable<Log[]> {
    return this.httpClient.get(TodoLibroConfig.getBackendUrl() + "/logging/get.php",
      {
        withCredentials: true
      }).pipe(map((arg: any) => {
        var logs: Log[] = [];

        arg.forEach((element: any) => {
          logs.push({
            userId: element['userId'],
            Action: element['Action'],
            Date: new Date(element['Time']),
            rawDate: element['Time']
          })
        });

        return logs;
      }));
  }

  deleteLog(log: Log): Observable<any> {
    return this.httpClient.post<any>(TodoLibroConfig.getBackendUrl() + "/logging/delete.php", JSON.stringify({
      userId: log.userId,
      action: log.Action,
      date: log.rawDate
    }), {
      withCredentials: true
    });
  }

  //#endregion

  //#region 

  uploadFile(file: File, params: string = ""): Observable<BackendResponse<{ fileName: string } | Error>> {
    var formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.httpClient.post<BackendResponse<{ fileName: string } | Error>>(TodoLibroConfig.getBackendUrl() + `/file/${params}`, formData,
      {
        withCredentials: true,
        reportProgress: true,
        observe: 'body'
      });
  }

  deleteFile(fileName: string): Observable<BackendResponse<any | Error>> {
    const obj: { fileName: string } = {
      fileName: fileName
    }

    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.delete<BackendResponse<{ fileName: string } | Error>>(TodoLibroConfig.getBackendUrl() + "/file/", {
      headers: headers,
      body: JSON.stringify(obj),
      withCredentials: true,
    });
  }

  //#endregion

  //#region PURCHASES

  purchaseBook(book: Libro, purchaseDetails: PurchaseDetails): Observable<BackendResponse<boolean | Error>> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<BackendResponse<boolean | Error>>(
      TodoLibroConfig.getBackendUrl() + "/purchases/perform/",
      JSON.stringify({
        purchaseData: purchaseDetails,
        purchaseElement: book
      }),
      {
        headers: headers,
        withCredentials: true
      }
    );
  }

  purchaseCart(purchaseDetails: PurchaseDetails): Observable<BackendResponse<boolean | Error>> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<BackendResponse<boolean | Error>>(
      TodoLibroConfig.getBackendUrl() + "/purchases/cart/",
      JSON.stringify(purchaseDetails),
      {
        headers: headers,
        withCredentials: true
      }
    );
  }

  //#endregion

  //#region USER FUNCTIONS

  getRecommandedBooks() : Observable<BackendResponse<Libro[] | Error>>
  {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get<BackendResponse<Libro[] | Error>>(TodoLibroConfig.getBackendUrl() + "/recommendations/", {
      headers: headers,
      withCredentials: true
    });
  }

  getRecommandedBooksByAuthor() : Observable<BackendResponse<Libro[] | Error>>
  {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get<BackendResponse<Libro[] | Error>>(TodoLibroConfig.getBackendUrl() + "/recommendations/by/author/", {
      headers: headers,
      withCredentials: true
    });
  }

  getRecommandedBooksByPublisher() : Observable<BackendResponse<Libro[] | Error>>
  {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get<BackendResponse<Libro[] | Error>>(TodoLibroConfig.getBackendUrl() + "/recommendations/by/publisher/", {
      headers: headers,
      withCredentials: true
    });
  }

  //#endregion
}
