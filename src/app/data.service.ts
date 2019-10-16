import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http: HttpClient) { }

  postRegister = (user) => {
    return this._http.post("http://10.117.189.162:9090/book-lending-system/users/", user);
  }

  getLoginUser = (email, password) => {
    let userObj = {
      "email": email,
      "password": password
    }
    return this._http.post("http://10.117.189.162:9090/book-lending-system/login", userObj)

  }


}
