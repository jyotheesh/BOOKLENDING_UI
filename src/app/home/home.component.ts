import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  display: boolean = false;
  userId;
  bookName: string;
  authorName: string;
  cols = [];
  books = [];
  pageNo = 0;

  constructor(private _service: DataService) {
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


  }
  /**
   * Add Book
   */
  addBook = () => {

    this._service.postBookToApi(this.bookName, this.authorName, this.userId).subscribe((data) => {
      console.log(data);
      this.display = false;

      alert("Book added successfully");
      this.bookName = "";
      this.authorName = "";

    })

  }

  borrowBook = () => {

  }

  requestBook = () => {

  }

  ngOnInit() {
    this.userId = sessionStorage.getItem("key");
    this._service.getAllBooks(this.pageNo).subscribe((data) => {
      console.log(data)
      this.books = data;
    })

  }

}
