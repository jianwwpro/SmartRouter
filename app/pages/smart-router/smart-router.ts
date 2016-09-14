import { Component } from '@angular/core';
import {ViewController, NavController,ModalController,PopoverController,LoadingController} from 'ionic-angular';
import {UserUtiils} from '../../utils/UserUtils';
import { Network } from 'ionic-native';
import {WifiTipPage} from './wifi-tip';
import {UserLoginPage} from '../user-center/user-login';
import {WanConfPage} from './router-conf/wan-conf'
/*
  Generated class for the SmartRouterPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/smart-router/smart-router.html',
})
export class SmartRouterPage {
  private userUtiils : UserUtiils;
  private beWifiTip : boolean =false;
  private beLoginShow: boolean=false;
  private beConnectionShow: boolean=false;
  private isLogin:boolean;

  private beFirstEnter:boolean = true;



  constructor(private view:ViewController, private navCtrl: NavController,private modalController:ModalController,private popoverController:PopoverController,private loadingController: LoadingController) {
    this.userUtiils  = new UserUtiils(modalController);
    //监听网络变化
    let disconnectSubscription = Network.onDisconnect().subscribe(() => {
      this.stateChange();
      //this.view.didEnter;
    });

    // watch network for a connection
    let connectSubscription = Network.onConnect().subscribe(() => {
      this.stateChange();
      //this.view.didEnter;
    });
    
  //检查是否登录
    let self = this;

    this.userUtiils.isLogin(function(login){
      self.isLogin=login;
    });
  }

/**
 * 打开登录页面
 */
  openLogin(){
    let loginPage = this.modalController.create(UserLoginPage);
    loginPage.present();
  }

  //打开连接wifi窗口
  openConnection(){
    this.modalController.create(WifiTipPage).present();

  }


   //页面进入如果没有连接wifi则提示
  ionViewDidEnter(){
    console.log("end");
    this.stateChange();
  	if(!this.beWifiTip)
    //	this.userUtiils.wifiTipFilter();
    this.beWifiTip=true;
    
  }
  /**
   * 手机连接状态变化
   */
  stateChange(){
    setTimeout(() => {
		  if(this.userUtiils.isWifi() === false){
        this.beConnectionShow=true;
        this.beLoginShow=false;
      }else{
        this.beConnectionShow=false;
        //判断登录状况
        this.userUtiils.isLogin((b) => {
          if(!b){
            this.beLoginShow=true;
            this.isLogin=false;
          }else {
            this.isLogin=true;
            this.beLoginShow=false;
          }
        });
      }
 		 }, 1000);
  }


/**
 * 打开外网配置
 */
  openWanConf(){
    this.navCtrl.push(WanConfPage);
  }
}
