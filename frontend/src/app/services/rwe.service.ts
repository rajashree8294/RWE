import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {BASE_URL} from "./baseUrl";
import {DatePipe} from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class RweService {
    datePipe = new DatePipe('en-US');

    constructor(private http: HttpClient) {
    }

    getNOAAstations(reqObj: any): Observable<any> {
        return this.http.post(BASE_URL + "/stations", reqObj).pipe(catchError(this.errorHandling));
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

    getStationDetails(stationData: any): Observable<any> {
        let datasetid = stationData.id.split(":")[0];
        let startdate = new Date(stationData.mindate);
        let enddate = new Date(stationData.maxdate);
        if (enddate.getFullYear() - startdate.getFullYear() > 1) {
            enddate.setFullYear(startdate.getFullYear() + 1);
            enddate.setMonth(startdate.getMonth());
            enddate.setDate(startdate.getDay());
        }

        let strStartDate = this.datePipe.transform(stationData.startdate, 'yyyy-MM-dd');
        let strEndDate = this.datePipe.transform(stationData.enddate, 'yyyy-MM-dd');
        // let startYear = parseInt(stationData.mindate.split("-")[0]);
        // let endDate = (startYear + 1).toString()+ stationData.startdate.substr(3);

        const params = {
            // datasetid: datasetid,
            // datatypeid: 'TMAX,TMIN',
            stationid: stationData.id,
            startdate: strStartDate,
            enddate: strEndDate,
            limit: '1000'
        };
        // return this.http.get('https://www.ncdc.noaa.gov/cdo-web/api/v2/data', {
        //   params,
        //   observe: 'body'
        // }).pipe(catchError(this.errorHandling));

        return this.http.post(BASE_URL + "/temp-data", params).pipe(catchError(this.errorHandling));
    }
}
