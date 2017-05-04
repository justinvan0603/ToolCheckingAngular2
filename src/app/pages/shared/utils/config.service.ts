import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

    _apiURI : string;

    constructor() {
        this._apiURI = 'http://192.168.1.179:7118/api/';
     }

     getApiURI() {
         return this._apiURI;
     }

     getApiHost() {
         return this._apiURI.replace('api/','');
     }
}
