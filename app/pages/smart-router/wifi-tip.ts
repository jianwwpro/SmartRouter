import { Component } from '@angular/core';
import { NavController,ModalController,ViewController } from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/smart-router/wifi-tip.html',
})
export class WifiTipPage {
  constructor(private viewController:ViewController,private navCtrl: NavController,private modalController: ModalController) {
  }
  //wifitip关闭
  close(){
  	console.log("dismiss");
  	this.viewController.dismiss();
  }
}
