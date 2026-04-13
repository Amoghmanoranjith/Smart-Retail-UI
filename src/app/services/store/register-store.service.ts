import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { StoreDTO } from 'src/app/models/dto/store-dto';

@Injectable({
  providedIn: 'root'
})
export class RegisterStoreService {

  private baseUrl = environment.BASE_URL + '/users'; // assuming endpoint

  constructor(private http: HttpClient) { }

  registerStore(storeData: Omit<StoreDTO, 'storeId'>): Observable<any> {
    if (!Array.isArray(storeData?.shelves) || storeData.shelves.length < 1) {
      throw new Error('registerStore requires at least 1 shelf in shelves[]');
    }
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.baseUrl}/registerstore`, storeData, { headers });
  }
}
