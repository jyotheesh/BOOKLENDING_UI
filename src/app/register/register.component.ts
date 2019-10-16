import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { confirmPassValid } from './validations'
import { DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User
  cpassword: string;
  constructor(private _router: Router, private _builder: FormBuilder, private _service: DataService) {
    this.user = new User()
  }

  regForm = this._builder.group({

    name: ['', Validators.required],
    mobile: ['', Validators.required],
    mailid: ['', Validators.required],
    pword: ['', Validators.required],
    cpword: ['', Validators.required]

  }, { validator: confirmPassValid })


  register = () => {
    console.log(this.user)
    localStorage.setItem(this.user.email, JSON.stringify(this.user));
    this._service.postRegister(this.user).subscribe((data) => {
      console.log(data);
    })
    this._router.navigate(['login']);
  }

  ngOnInit() {


  }

}
