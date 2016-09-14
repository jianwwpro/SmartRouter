import {Storage,LocalStorage,ModalController,PopoverController} from 'ionic-angular';
import {UserCenterPage} from '../pages/user-center/user-center';
import {WifiTipPage} from '../pages/smart-router/wifi-tip';
import { Network } from 'ionic-native';

export class UserUtiils{
	private local: Storage;
	constructor(private modalController:ModalController){
		this.local = new Storage(LocalStorage);
	}	

	loginFilter(){
		this.local.get('userName').then((result) => {
	      if(!result){
	        console.log("noLogin");
	        let loginPage = this.modalController.create(UserCenterPage);
	        loginPage.present();
	      }
	    });
	}
	//wifi提示弹出框
	wifiTipFilter(){
	    setTimeout(() => {
		    if (Network.connection != 'wifi') {
				let popover = this.modalController.create(WifiTipPage);
				popover.present();
		    }
 		 }, 1000);
	     
	}
//是否是wifi
	isWifi(){
		return true;
		//return (Network.connection === 'wifi');
	}
//判断是否登录
	isLogin(fn){

		return this.local.get("userName").then((result)=>{
			if(result)
				return fn(true);
			else 
				return fn(false);
		});
	}

}