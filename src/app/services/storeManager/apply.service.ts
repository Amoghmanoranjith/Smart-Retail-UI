import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from 'src/app/models/api-response';
import { StoreDTO } from 'src/app/models/dto/store-dto';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApplyService {
  private baseUrl = environment.BASE_URL + '/users';
  constructor(private http: HttpClient) { }

  applyForStoreManager(data: StoreDTO): Observable<APIResponse<string>>{
    return this.http.post<APIResponse<string>>(`${this.baseUrl}/apply-store-manager`, data);
  }
}
