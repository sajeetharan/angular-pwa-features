import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';
import { CustomError } from '../../model/customError';
import { RequestCacheService } from '../../service/request-cache/request-cache.service';
import {TYPE_DANGER,
        TYPE_WARNING,
        ERR_MSG_403,
        ERR_MSG_SEARCH_404,
        ERR_MSG_DEFAULT, 
        } from '../../constant';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private cache: RequestCacheService) { }
  
  /*  
  The following cases are handled in the intercpetor:
  http request with positive result;
  http request that receives an error;
  data recovery in case of offline connection;
  management of a user not found; also 
  each call has a delay (500) to show it
  spinner waiting for the response
  */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
    if(!window.navigator.onLine){
      const cachedResponse = this.cache.get(request); 
      if(cachedResponse){
        const httpResponse = new HttpResponse(); 
        Object.assign(httpResponse,{body: cachedResponse});
        return of(httpResponse).pipe(delay(500));  
      } else {
        const customError = new CustomError();
        customError.msg = ERR_MSG_SEARCH_404;
        customError.type = TYPE_WARNING;
        let httpErrorResponse = new HttpErrorResponse({status: 0}); 
        return this.manageErrors(httpErrorResponse);
      }      
    }else {    
      return this.sendRequest(request, next)
    }
  }

  /*
  function that sends the http request to the remote API
  if internet connection is online 
  */
  sendRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      delay(500),
      map((event: HttpResponse<any>) => {    
        this.cache.put(req, event);
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        return this.manageErrors(error);
      })
    );
  }

  // function to manage errors by checking the status code
  private manageErrors(error: HttpErrorResponse){    
    let customError: CustomError = new CustomError();
    switch (error.status) {
      case 403:
        customError.msg = ERR_MSG_403;
        customError.type = TYPE_DANGER;
        break;
      case 0:
      case 404:
        customError.msg = ERR_MSG_SEARCH_404;
        customError.type = TYPE_WARNING;
        break;
      default:
        customError.msg = ERR_MSG_DEFAULT;
        customError.type = TYPE_DANGER;
        break;
    }
    return throwError(customError);
  }



}
