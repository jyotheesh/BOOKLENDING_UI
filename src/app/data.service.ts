import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

/**
 * dataservice class to communicate with the API
 *  @author: yathish
 */
export class DataService {

  constructor(private _http: HttpClient) { }

  /**
   *postRegister method to save user data to backend
   */
  postRegister = (user) => {
    return this._http.post("http://10.117.189.126:9090/book-lending-system/users/", user);
  }


  /**
   * getting all the users from the database
   */
  getLoginUser = (email, password) => {
    let userObj = {
      "email": email,
      "password": password
    }
    return this._http.post("http://10.117.189.126:9090/book-lending-system/login", userObj)
  }

  /**
   * adding book to the backend table
   */
  postBookToApi = (bookName, authorName, userId) => {
    let book = {
      "bookName": bookName,
      "authorName": authorName,
      "userId": userId
    }
    return this._http.post("http://10.117.189.126:9090/book-lending-system/books", book)
  }

  /**
   * Get All the books
   * @param: pageNo
   */
  getAllBooks = (pageNo: number) => {
    return this._http.get<Array<object>>("http://10.117.189.126:9090/book-lending-system/books/?pageNumber=" + pageNo);
  }

  /**
   * Get the Search Result for search crite
   * @returns :Array
   */
  getSearchDetails = () => {
    return this._http.get("");
  }


}
