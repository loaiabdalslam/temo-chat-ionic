import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, MenuController } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {HttpProvider} from "../../providers/http/http";
import {User} from "../../models/user";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account = {
    username: 'yajuve',
    fullname: 'Mohamed Raouf',
    email: 'yajuve.25.dz@gmail.com',
    password: 'demodemo'
  };

  // Our translated text strings
  private loginErrorString: string;
  private opt: string = 'signin';

  constructor(public http:HttpProvider, public userProvider: UserProvider, public menuCtrl: MenuController, public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {
    this.menuCtrl.enable(false);
    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
  doLogin() {
    this.http.get('my-profile.json').subscribe((profile) => {
      console.log(profile);
      this.userProvider.user = <User>profile;
      this.navCtrl.setRoot('ListFriendsPage');
    }, (err) => {
      console.error(err);
    });

    /*this.user.login(this.account).subscribe((resp) => {
      this.navCtrl.push('ListFriendsPage');
    }, (err) => {
      console.error(err);
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });*/
  }
}
