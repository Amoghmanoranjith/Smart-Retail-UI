import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = environment.BASE_URL + '/users'; // change if needed

  constructor(private http: HttpClient) { }

  //login via cred
  login(data: any): Observable<string> {
    return this.http.post(
      `${this.baseUrl}/login`,
      data,
      { responseType: 'text' }
    );
  }
}
