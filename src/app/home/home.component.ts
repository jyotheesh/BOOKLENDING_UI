import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  display: boolean = false;


  constructor() { }
  addBook = () => {
    this.display = true;
  }



  ngOnInit() {
  }

}
