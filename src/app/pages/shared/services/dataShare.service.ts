import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import {Body} from "@angular/http/src/body";
@Injectable()
export class DataShareService {

    public _pageSize: number;
    public _baseUri: string;

    constructor(public http: Http) {

    }

    set(baseUri: string, pageSize?: number): void {
        this._baseUri = baseUri;
        this._pageSize = pageSize;
    }

    get(page: number) {

   //   let headers = new Headers();
  //    headers.append('Content-Type', 'application/json');
    //  let body = new Body();

        var uri = this._baseUri + page.toString() + '/' + this._pageSize.toString();

      console.log(uri);
        return this.http.get(uri)
            .map(response => (<Response>response));
    }

    post(data?: any, mapJson: boolean = true) {
      console.log(data);
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
        if (mapJson)
            return this.http.post(this._baseUri, data, {
              headers: headers
            })
                .map(response => <any>(<Response>response).json());
        else
            return this.http.post(this._baseUri, data);
    }

    delete(id: number) {
        return this.http.delete(this._baseUri + '/' + id.toString())
            .map(response => <any>(<Response>response).json())
    }

    deleteResource(resource: string) {
        return this.http.delete(resource)
            .map(response => <any>(<Response>response).json())
    }
}
