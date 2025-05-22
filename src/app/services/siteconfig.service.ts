import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TodoLibroConfig } from '../todolibro.config';

@Injectable({
  providedIn: 'root'
})
export class SiteConfigService
{
  private testingBackendUrl : string = "https://192.168.1.254:27032/endpoints";
  private productionBackendUrl : string = "https://todolibro.dpdns.org/endpoints";

  constructor(private httpClient : HttpClient)
  {
    TodoLibroConfig.setBackendUrl(this.productionBackendUrl);

    this.getInTestingSite().subscribe((data : boolean) => {
      if(data == true)
        TodoLibroConfig.setBackendUrl(this.testingBackendUrl);
      else
        TodoLibroConfig.setBackendUrl(this.productionBackendUrl);
    })
  }

  getInProductionMode() : Observable<boolean>
  {
    return this.httpClient.get<{ payload: boolean }>(TodoLibroConfig.getBackendUrl() + "/config/InProductionMode.php").pipe(map(response => response.payload));
  }

  getInTestingSite() : Observable<boolean>
  {
    return this.httpClient.get<{ payload: boolean }>(TodoLibroConfig.getBackendUrl() + "/config/InTestingSite.php").pipe(map(response => response.payload));
  }

  getSiteNameAsync() : Observable<string>
  {
    return this.httpClient.get<{ payload: string }>(TodoLibroConfig.getBackendUrl() + "/getSiteName.php").pipe(map(response => response.payload));
  }
}
