import { Component } from '@angular/core';
import { NavController,ModalController,ViewController,ToastController,LoadingController } from 'ionic-angular';
import {RouterInterface} from '../../../providers/router-interface/router-interface'

@Component({
  templateUrl: 'build/pages/smart-router/router-conf/wan-conf.html',
  providers:[RouterInterface]
})
export class WanConfPage {

    conf:any={
        mode:2+""
    }

  constructor(private loadingController:LoadingController ,private toastController:ToastController,private viewController:ViewController,private navCtrl: NavController,private modalController: ModalController,private api:RouterInterface) {
      
  }
/**
 * 保存
 */
    saveConf(){
        let loading = this.loadingController.create();
        loading.present();
        this.api.netWanConfSet(this.conf).subscribe(res=>{
            console.log(res);
            
            if(res.error===0){
                this.viewController.dismiss();
            }else{
                this.toastController.create({
                    duration:1000,
                    message:'设置失败'
                }).present();
            }
            loading.dismiss();
        },error=> {
            loading.dismiss();
            this.toastController.create({
                message:'网络错误',
                position:'bottom',
                duration:1000
            }).present();
        });
            
    }
    //进入设置页面
    ionViewDidEnter(){
        let loading = this.loadingController.create();
        loading.present();
        this.api.netWanConf().subscribe(res=>{
            res.mode = res.mode+"";
           this.conf=res;
           loading.dismiss();
        },error=>{
            loading.dismiss()
        })
    }
  
}
