import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { UtilityService } from '../utility/utility.service';

const maxAge = 30000;
@Injectable({
  providedIn: 'root'
})
export class RequestCacheService {

  cache = new Map();

  constructor(private utility: UtilityService) {}

  /* 
  data recovery stored in the localstorage 
  if internet connection is offline 
  */
  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams;    
    this.cache = new Map();
    if(localStorage.getItem("cache")){
      const cacheStorage = localStorage.getItem("cache");
      this.cache = this.utility.object_to_map(cacheStorage);
    } 
    const cached = this.cache.get(url);
    if (!cached) return undefined;
    return cached.response;
  }

  /*
  I store data of the remote api in the localStorage. 
  They use a map with key (url) and value (json in string format),
  also any data that is in the localStorage for more than 30 seconds 
  is removed so as not to occupy too much memory
  */ 
  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const url = req.urlWithParams;
    const entry = { response: response.body, lastRead: Date.now() };
    this.cache.set(url, entry);    
    const expired = Date.now() - maxAge;
    this.cache.forEach(expiredEntry => {
      if (expiredEntry.lastRead < expired) {
        this.cache.delete(expiredEntry.url);
      }      
    });     
    const objForStorage = this.utility.map_to_object(this.cache);
    localStorage.setItem('cache',objForStorage);
  }

}
