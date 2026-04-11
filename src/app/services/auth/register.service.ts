import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private baseUrl = environment.BASE_URL + '/users'; // change if needed

  constructor(private http: HttpClient) { }

  //register a new user
  register(data: any) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }
}
