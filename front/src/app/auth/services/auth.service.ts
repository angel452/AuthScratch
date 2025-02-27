import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient ) { }

  signUp( email: string, password: string ) : Observable<any>{
    return this.http.post(`${environment.API_URL}/auth/signUp`, {
      email,
      password
    });
  }

  logIn(){

  }
}
