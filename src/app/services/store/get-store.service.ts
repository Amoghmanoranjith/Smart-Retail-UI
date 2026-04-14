import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from 'src/app/models/api-response';
import { StoreDTO } from 'src/app/models/dto/store-dto';
import { JwtHeaderService } from 'src/app/utils/jwt-header.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GetStoreService {
  private baseUrl = environment.BASE_URL + '/storemanager'; 
  constructor(private http: HttpClient, private jwtHeader : JwtHeaderService) { }

  getStore(): Observable<APIResponse<StoreDTO>> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = this.jwtHeader.getAuthHeaders();
    return this.http.get<APIResponse<StoreDTO>>(`${this.baseUrl}/store`, { headers });
  }
}
