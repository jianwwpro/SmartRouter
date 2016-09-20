import { Component } from '@angular/core';
import { NavController,ModalController,ViewController } from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/smart-router/router-conf/wisp-input.html',
})
export class WispInputPage {

  password:string;

  constructor(private viewController:ViewController,private navCtrl: NavController,private modalController: ModalController) {
  }
  //wifitip关闭
  close(type){
//save 1是保存使用
  	this.viewController.dismiss({save:type});
  }
}