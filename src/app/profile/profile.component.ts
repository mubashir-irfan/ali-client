import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../signin/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user = null;
  public profileForm: FormGroup;
  public hasError: boolean = false;
  public errorStatement: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private appService: AppService,
    ) { }

  ngOnInit(): void {
    this.user = this.appService.getUserdata();
    if (!this.user) { this.router.navigateByUrl('/signin')}
    this.profileForm = this.fb.group({
      password: [this.user.password,[ Validators.required ]],
      name: [this.user.name,[ Validators.required ]],
      address: [this.user.address,[ Validators.required ]],
      cnic: [this.user.cnic,[ Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      accountTitle: [this.user.accountTitle,[ Validators.required ]],
      accountNumber: [this.user.accountNumber,[ Validators.required ]],
      currencyCode: [this.user.currencyCode,[ Validators.required ]],
      branchName: [this.user.branchName,[ Validators.required ]],
      country: [this.user.country,[ Validators.required ]],
    });
  }

  // private removeItem(input, item) {
  //   input = input.toString().split().filter(i => i !== item);
  //   return input.join();
  // }

  private validateUserInput() {
    // validation logic to go here
    return true;
  }


  public onSave() {
     if (!this.validateUserInput()) return;
    console.log('saving...', this.profileForm.value);
    this.appService.updateProfile({username: this.user.username, ...this.profileForm.value}).subscribe(data => {
      this.user = data;
    })
  }

}
