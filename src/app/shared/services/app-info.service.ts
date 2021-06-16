import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppInfoService {
  constructor(private _http: HttpClient) {}

  public get title() {
    return 'Test Ngrxform';
  }

  public get currentYear() {
    return new Date().getFullYear();
  }

  getTodo() {
    return this._http.get<any>('https://jsonplaceholder.typicode.com/todos/1');
  }
}
