import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from 'src/app/models/api-response';
import { RoleDTO } from 'src/app/models/role-dto';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CommonDashboardService {

private baseUrl = environment.BASE_URL + '/users';

  constructor(private http: HttpClient) { }

  // get the roles
  getRoles(): Observable<APIResponse<RoleDTO[]>> {
  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.get<APIResponse<RoleDTO[]>>(
    `${this.baseUrl}/roles`,
    { headers }
  );
}}
