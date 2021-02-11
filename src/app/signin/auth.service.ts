
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


export interface ILogin {
  username: string;
  password: string;
}

@Injectable()
export class AppService {

  private user: any;

  constructor(
    private httpClient: HttpClient
  ) { }

  public setUserData(user) {
    this.user = user;
  }

  public getUserdata() { return this.user;}

  public login(body: ILogin) {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
      })
  }

    return this.httpClient.post('http://localhost:7777/core/auth/signin', JSON.stringify(body), httpOptions);
  }

  public updateProfile(body) {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
      })
  }

    return this.httpClient.put('http://localhost:7777/core/profile/update', JSON.stringify(body), httpOptions);
  }

}
