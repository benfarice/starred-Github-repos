import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Config} from "@app/config";

@Injectable({
  providedIn: 'root'
})
export class RepoService {

  constructor(private _http: HttpClient) { }

  public getrepos(page: number = 1): Observable<any> {
    const params = "created:>2017-10-22&sort=stars&order=desc"
    return this._http.get(Config.api.repositories.get + params + '&page=' + page);
  }
}
