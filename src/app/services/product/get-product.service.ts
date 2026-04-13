import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ProductDTO } from 'src/app/models/dto/product-dto';
import { APIResponse } from 'src/app/models/api-response';

@Injectable({
  providedIn: 'root'
})
export class GetProductService {

  private baseUrl = environment.BASE_URL + '/product';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<APIResponse<ProductDTO[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<APIResponse<ProductDTO[]>>(`${this.baseUrl}/getallproducts`, { headers });
  }
}
