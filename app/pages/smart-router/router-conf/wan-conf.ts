import { Component } from '@angular/core';
import { NavController,ModalController,ViewController,ToastController } from 'ionic-angular';
import {RouterInterface} from '../../../providers/router-interface/router-interface'

@Component({
  templateUrl: 'build/pages/smart-router/router-conf/wan-conf.html',
  providers:[RouterInterface]
})
export class WanConfPage {

    conf:any={
        mode:2
    }

  constructor(private toastController:ToastController,private viewController:ViewController,private navCtrl: NavController,private modalController: ModalController,private api:RouterInterface) {
  }

    saveConf(){
        this.api.netWanConfSet(this.conf).subscribe(res=>{
            this.viewController.dismiss();
        },error=> {
            this.toastController.create({
                message:'网络错误',
                position:'bottom',
                duration:1000
            }).present();
        });
            
    }

  
}
