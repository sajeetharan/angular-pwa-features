import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  GITHUB_API,
  END_PATH_REPOS,
  END_PATH_EVENTS,
  END_PATH_FOLLOWERS,
  END_PATH_FOLLOWING
} from '../../constant';
import { Observable, throwError } from 'rxjs';
import { Repository } from '../../model/repository';
import { map, catchError } from 'rxjs/operators';
import { User } from '../../model/user';
import { Activity } from '../../model/activity';
import { CustomError } from '../../model/customError';


//service to retrieve data from remote api
@Injectable()
export class BackendApiService {

  /*
  example default user: rgbkrk (machine learning expert)
  other users used to test pwa:   
  jaredpalmer (creator of formik library)
  bahdcoder (udemy instructor and web developer)
  */
  private _userDefault: string = 'rgbkrk';

  public get userDefault(): string {
    return this._userDefault;
  }
  public set userDefault(value: string) {
    this._userDefault = value;
  }

  constructor(private http: HttpClient) { }

  private getError(error: CustomError) {
    return throwError(error);
  };

  findUserByUsername(username: string): Observable<User> {
    return this.http.get(`${GITHUB_API}/${username}`)
      .pipe(     
        map((response: User) => response),
        catchError(this.getError)
      )
  }

  findReposByUsername(username: string): Observable<Repository[]> {
    return this.http.get(`${GITHUB_API}/${username}/${END_PATH_REPOS}`)
      .pipe(       
        map((response: Repository[]) => response),
        catchError(this.getError)
      );
  }

  findActivitiesByUsername(username: string): Observable<Activity[]> {
    return this.http.get(`${GITHUB_API}/${username}/${END_PATH_EVENTS}`)
     .pipe( 
        map((response: Activity[]) => response),
        catchError(this.getError)
     );
  }

  findFollowersByUsername(username: string): Observable<User[]> {
    return this.http.get(`${GITHUB_API}/${username}/${END_PATH_FOLLOWERS}`)
     .pipe(    
        map((response: User[]) => response),
        catchError(this.getError)
     );
  }

  findFollowingByUsername(username: string): Observable<User[]> {
    return this.http.get(`${GITHUB_API}/${username}/${END_PATH_FOLLOWING}`)
      .pipe(         
        map((response: User[]) => response),
        catchError(this.getError)
      );
  }

}
