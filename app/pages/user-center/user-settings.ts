import { Component } from '@angular/core';
import { NavController,ViewController,ToastController,Storage,LocalStorage } from 'ionic-angular';
import {SQLite} from 'ionic-native'
import {LocalUtiils} from '../../utils/Local'

@Component({
  templateUrl: 'build/pages/user-center/user-settings.html',
})
export class UserSettingsPage {
  routerIp:string;
  
  constructor(private navCtrl: NavController,private view:ViewController,private toastController : ToastController) {
      LocalUtiils.getLocal().get("routerIp").then((result)=>{
          this.routerIp = result||"192.168.8.1";
      });
  }
/**
 * 页面离开，保存数据
 */
  ionViewWillLeave(){
      LocalUtiils.getLocal().set("routerIp",this.routerIp);
  }




 
}
