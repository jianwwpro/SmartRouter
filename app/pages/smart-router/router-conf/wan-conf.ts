import { Component } from '@angular/core';
import { NavController,ModalController,ViewController } from 'ionic-angular';
import {RouterInterface} from '../../../providers/router-interface/router-interface'

@Component({
  templateUrl: 'build/pages/smart-router/router-conf/wan-conf.html',
  providers:[RouterInterface]
})
export class WanConfPage {

    conf:any={
        mode:2
    }

  constructor(private viewController:ViewController,private navCtrl: NavController,private modalController: ModalController,private api:RouterInterface) {
  }

    save(){
        this.api.netWanConfSet(this.conf).map(res=>{
            console.log(res);
            alert(JSON.stringify(this.conf));
        });
        this.viewController.dismiss();    
    }

  
}
