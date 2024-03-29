import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { from, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { environment } from "./../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AppServiceService {
  serverUrl = environment.API;
  errorData: {};

  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http
      .get<getAllUsers>(this.serverUrl + "user/users")
      .pipe(catchError(this.handleError));
  }

  filterAllUsers(input) {
    return this.http
      .post<any>(this.serverUrl + "user/user_list", input)
      .pipe(catchError(this.handleError));
  }

  filterAllBrokers(input) {
    return this.http
      .post<any>(this.serverUrl + "user/broker_list", input)
      .pipe(catchError(this.handleError));
  }

  getdashboard() {
    return this.http
      .get<any>(this.serverUrl + "user/dashboard")
      .pipe(catchError(this.handleError));
  }

  getBooking() {
    return this.http
      .get<any>(this.serverUrl + "user/admin-booking")
      .pipe(catchError(this.handleError));
  }

  getAllBrokerList() {
    return this.http
      .get<any>(this.serverUrl + "user/web-brokers")
      .pipe(catchError(this.handleError));
  }

  getAllBroker() {
    return this.http
      .post<getAllUsers>(this.serverUrl + "user/brokers")
      .pipe(catchError(this.handleError));
  }

  addUsers(input) {
    return this.http
      .post<getAllUsers>(this.serverUrl + "user/users", input)
      .pipe(catchError(this.handleError));
  }

  updateUsers(input, id) {
    return this.http
      .post<getAllUsers>(this.serverUrl + "user/users/" + id, input)
      .pipe(catchError(this.handleError));
  }

  deleteData(input) {
    return this.http
      .post<any>(this.serverUrl + "user/delete-data", input)
      .pipe(catchError(this.handleError));
  }

  brokerProfile(input) {
    return this.http
      .post<any>(this.serverUrl + "user/brokerProfile", input)
      .pipe(catchError(this.handleError));
  }

  updateBooking(input) {
    return this.http
      .post<getAllUsers>(this.serverUrl + "user/booking-update", input)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.

      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.

      // The response body may contain clues as to what went wrong.

      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }

    // return an observable with a user-facing error message

    return throwError("Something bad happened. Please try again later.");
  }
}

interface getAllUsers {
  id: number;
  name: string;
  email: string;
  roll_id: string;
  status: string;
}
