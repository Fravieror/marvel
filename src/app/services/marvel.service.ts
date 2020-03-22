import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { globales } from 'src/globales';
import {map} from 'rxjs/operators';
import {Md5} from 'ts-md5/dist/md5';

@Injectable()
export class MarvelService {
  constructor(private http: Http, private globals: globales) {    
  }
  GetHeros(
    hero: string
  ) {
    var endPoint = '/v1/public/characters';

    let HeadersApp = new Headers({Accept: "*/*"});        
    let ParamsApp: URLSearchParams = new URLSearchParams();
    ParamsApp.append('nameStartsWith', hero);        
    ParamsApp.append('apikey', this.globals.publicKey);
    ParamsApp.append('ts', '1');
    ParamsApp.append('limit', '40');
    ParamsApp.append('hash', Md5.hashStr("1" + this.globals.privateKey + this.globals.publicKey).toString());

    let options = new RequestOptions({
      headers: HeadersApp,
      params: ParamsApp
    });

    return this.http
          .get(this.globals.gateway + endPoint, options)
          .pipe(map(response => {
            return response.json()}
          ));      
  }
  GetResource(resourceURI: string){
    resourceURI = resourceURI.replace("http", "https");
    let HeadersApp = new Headers({Accept: "*/*"});        
    let ParamsApp: URLSearchParams = new URLSearchParams();    
    ParamsApp.append('apikey', this.globals.publicKey);
    ParamsApp.append('ts', '1');
    ParamsApp.append('hash', Md5.hashStr("1" + this.globals.privateKey + this.globals.publicKey).toString());
    let options = new RequestOptions({
      headers: HeadersApp,
      params: ParamsApp
    });

    return this.http
          .get(resourceURI, options)
          .pipe(map(response => {
            return response.json()}
          ));
  }
}
