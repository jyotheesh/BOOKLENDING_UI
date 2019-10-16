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

  constructor(private _service: DataService) { }
  addBook = () => {
    this.display = true;
    this._service.postBookToApi(this.bookName, this.authorName, this.userId).subscribe((data) => {
      console.log(data)
    })

  }



  ngOnInit() {
    this.userId = sessionStorage.getItem("key")

  }

}
