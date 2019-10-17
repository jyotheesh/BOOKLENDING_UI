import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { doesNotThrow } from 'assert';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * dataservice class to communicate with the API
 *  @author: yathish
 */
export class DataService {

  constructor(private _http: HttpClient) { }

  loginStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  updateLoginStatus = (status: boolean) => {
    this.loginStatus.next(status)
  }



  /**
   *postRegister method to save user data to backend
   */
  postRegister = (user) => {
    return this._http.post("http://13.233.128.233:9090/book-lending-system/users/", user);
  }


  /**
   * getting all the users from the database
   */
  getLoginUser = (email, password) => {
    let userObj = {
      "email": email,
      "password": password
    }
    return this._http.post("http://13.233.128.233:9090/book-lending-system/login", userObj)
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
    return this._http.post("http://13.233.128.233:9090/book-lending-system/books/", book)
  }

  /**
   * Get All the books
   * @param: pageNo
   */
  getAllBooks = (pageNo: number) => {
    return this._http.get<Array<object>>("http://13.233.128.233:9090/book-lending-system/books/?pageNumber=" + pageNo);
  }

  /**
   * Get the Search Result for search crite
   * @returns :Array
   */
  getSearchResult = (title, author, pageNo) => {
    if (author != undefined && title != undefined) {
      return this._http.get("http://13.233.128.233:9090/book-lending-system/books/?authorName=" + author + "&bookName=" + title + "&pageNumber=" + pageNo);
    }
    else if (author != undefined) {
      return this._http.get("http://13.233.128.233:9090/book-lending-system/books/?authorName=" + author + "&pageNumber=" + pageNo);
    }
    else {
      return this._http.get("http://13.233.128.233:9090/book-lending-system/books/?bookName=" + title + "&pageNumber=" + pageNo);
    }

  }

  borrowBookFromApi = (bookId, userId) => {
    let obj = {
      "userId": userId
    }
    return this._http.post("http://13.233.128.233:9090/book-lending-system/books/" + bookId + "/borrow", obj)

  }

  requestBookFromApi = (bookId, userId) => {
    let obj = {
      "userId": userId
    }
    return this._http.post("http://13.233.128.233:9090/book-lending-system/books/" + bookId + "/request", obj)
  }


}
