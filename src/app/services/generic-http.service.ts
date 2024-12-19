import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {
  baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  httpGet(url: string): Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/${url}`);
  }

  httpPost(url: string, data: any){
    return this.httpClient.post(`${this.baseUrl}/${url}`, data);
  }

  httpPut(url: string, data: any) {
    return this.httpClient.put(`${this.baseUrl}/${url}`, data);
  }

  httpDelete(url: string) {
    return this.httpClient.delete(`${this.baseUrl}/${url}`);
  }
}
