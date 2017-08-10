import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {RegisterService} from '../../services/register.service';
import {User} from '../../models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = new User();
  registered = false;
  message: string;
  error = false;
  registerForm: FormGroup;

  constructor(private http: Http,
              private fb: FormBuilder,
              private registerService: RegisterService) {
  }

  ngOnInit() {
    this.createForm();
  }

  onSubmit(): void {

    this.registerService.register(this.user).subscribe(data => {
      this.registered = true;
      this.message = data.message;

    }, error => {
      this.error = true;
      this.message = error.message;
    });
  }

  private createForm(): void{
    this.registerForm = this.fb.group({
        username: ['', Validators.required],
        fullName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

}
