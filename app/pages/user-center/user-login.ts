import { Component } from '@angular/core';
import { NavController,ViewController,ToastController,Storage,LocalStorage,LoadingController } from 'ionic-angular';
import {md5} from '../../utils/md5'
import {LocalUtiils} from '../../utils/Local'
import {RouterInterface} from '../../providers/router-interface/router-interface'
@Component({
  templateUrl: 'build/pages/user-center/user-login.html',
  providers: [RouterInterface]
})
export class UserLoginPage {

  private md5Utils:md5;

  private user = {
    userName:'',
    password:''
  };

  constructor(private navCtrl: NavController,private view:ViewController,private toastController : ToastController,private api:RouterInterface,private loading:LoadingController) {
    this.md5Utils= new md5();
    
  }

login(){
  if(!this.user.userName||!this.user.password){
    this.toastController.create({
      duration:1000,
      message:'账号密码必须输入',
      position:'bottom',
    }).present();
    return;
  }
  let loading = this.loading.create({
    spinner:'ios'
  });
  loading.present();
  //转md5
  let uid = this.md5Utils.hex_md5(this.user.userName+this.user.password);
  uid = uid.toUpperCase();
  //调用接口
  this.api.login(uid).subscribe(res=>{
    alert(res.error);
    if(res.error===10001||res.error===20100000){
      this.toastController.create({
        message:'账号或密码错误',
        duration:1000,
        position:'bottom'
      }).present();
    }
    else if(res.error===0){
      LocalUtiils.getLocal().set("userName",uid);
      
      this.view.dismiss();
    }else{
      this.toastController.create({
        message:'登录出错',
        duration:1000,
        position:'bottom'
      }).present();
    }
    loading.dismiss();
    
  },error=>{
    let toast = this.toastController.create({
      message:'请求错误，可能是路由IP设置错误',
      duration:1000,
      position:'bottom'
    });
    toast.present();
    loading.dismiss();
  });
  //this.local.set("userName" ,this.user.userName);
  //

}

  close(){
  	this.view.dismiss();
  }
}
