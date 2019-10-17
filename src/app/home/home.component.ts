import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { doesNotThrow } from 'assert';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ConfirmationService]
})
export class HomeComponent implements OnInit {
  display: boolean = false;
  userId;
  bookName: string;
  authorName: string;
  cols = [];
  books = [];
  pageNo = 0;
  msgs = []
  searchByName: string;
  searchByAuthor: string;
  show: boolean = false;



  constructor(private messageService: MessageService, private _service: DataService, private confirmationService: ConfirmationService, private _router: Router) {
    this.cols = [
      { field: 'bookName', header: 'Book Name' },
      { field: 'authorName', header: 'Author Name' },
      { field: 'bookStatus', header: 'Book Status' },

    ];
  }

  /**
  show the popup  
  */
  showPopUp = () => {
    this.display = true;
  }

  searchBook = () => {
    this._service.getSearchResult(this.searchByName, this.searchByAuthor, this.pageNo).subscribe((data) => {
      console.log("search result", data);
      this.books = data['bookList'];
    })

  }

  /**
   * Add Book
   */
  addBook = () => {

    this._service.postBookToApi(this.bookName, this.authorName, this.userId).subscribe((data) => {
      console.log(data);
      this.display = false;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: data['message'] });

      this.getBooks();
      this.bookName = "";
      this.authorName = "";

    })

  }

  cancelAdd = () => {
    this.display = false;
    this.bookName = "";
    this.authorName = "";

  }

  borrowBook = (bookId) => {
    console.log("bookdid", bookId)
    this._service.borrowBookFromApi(bookId, this.userId).subscribe((data) => {
      console.log("bookssssssss", data['message']);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Book Borrowed Successfully' });

    })
    setTimeout(() => {
      this.getBooks();
    }, 500);

  }

  requestBook = (bookId, event) => {
    console.log("event object", event)
    this._service.requestBookFromApi(bookId, this.userId).subscribe((data) => {
      console.log("requesttttt", data['message'])
      this.messageService.add({ severity: 'success', summary: 'Success', detail: data['message'] });

    })
    setTimeout(() => {
      this.show = true;
      this.getBooks();
    }, 500);

  }

  logout = () => {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Log-out?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        sessionStorage.removeItem('key');
        this._service.updateLoginStatus(true);
        this._router.navigate(['login']);

      }

    });
  }


  getBooks = () => {
    this._service.getAllBooks(this.pageNo).subscribe((data) => {
      console.log(data)
      if (data['statusCode'] == 200) {
        this.books = data['bookList'];
      }

    })
  }

  ngOnInit() {
    this.userId = sessionStorage.getItem("key");
    console.log("userid", this.userId)
    this.getBooks();


  }

}
