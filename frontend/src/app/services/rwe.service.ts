import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {BASE_URL} from "./baseUrl";

@Injectable({
  providedIn: 'root'
})
export class RweService {

  constructor(private http: HttpClient) {
  }

  getNOAAstations(reqObj: any): Observable<any> {
    const params = {
      startdate: '1970-10-03',
      enddate: '2012-09-10',
      extent: '47.5204,-122.2047,47.6139,-122.1065'
    };
    return this.http.post(BASE_URL + "/stations", reqObj).pipe(catchError(this.errorHandling));
    /*return this.http.get(BASE_URL + "/stations", {
      params,
      observe: 'body'
    }).pipe(catchError(this.errorHandling));*/
  }

  // Error handling
  errorHandling(error: HttpErrorResponse): any {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(error);
  }
}
