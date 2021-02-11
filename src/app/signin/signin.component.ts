import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService, ILogin } from './auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public signinForm: FormGroup;
  public hasError: boolean = false;
  public errorStatement: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private appService: AppService,
  ) { }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      password: ['',[ Validators.required ]],
      username: ['', [ Validators.required ]],
    });
  }

  public onSignin() {
    const username: string = this.signinForm.value.username;
    const password: string = this.signinForm.value.password;
    const body: ILogin = { username: username, password: password };

    this.appService.login(body).pipe(catchError((err: HttpErrorResponse) => {
      this.hasError = true;
      this.errorStatement = err.error;
      console.log('Sign in error: ',err);
      return throwError(err)
    })).subscribe(data => {
      this.hasError = false;
      this.appService.setUserData(data);
      this.router.navigateByUrl('/profile');
      console.log('login response:', data)
    })
  }

}
