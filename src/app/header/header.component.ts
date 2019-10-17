import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  display: boolean;
  constructor(private _service: DataService) { }


  getLoginStatus = () => {
    this._service.loginStatus.subscribe(data => {
      this.display = data;
    })
  }
  ngOnInit() {
    // this._service.check();
    this.getLoginStatus();

  }

}
