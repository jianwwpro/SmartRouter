import { Component } from '@angular/core';
import { NavController,LocalStorage,Storage } from 'ionic-angular';
import {UserSettingsPage} from './user-settings'

/*
  Generated class for the UserCenterPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/user-center/user-center.html',
})
export class UserCenterPage {
private local:Storage;
  constructor(private navCtrl: NavController) {
    this.local= new Storage(LocalStorage);
  }


openSettings(){
  this.navCtrl.push(UserSettingsPage);
}

  logout(){
    this.local.remove("userName");
  }


}
