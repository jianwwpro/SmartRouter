import { Component } from '@angular/core';
import {AlertController, NavController,ModalController,ViewController,ToastController,LoadingController } from 'ionic-angular';
import {RouterInterface} from '../../../providers/router-interface/router-interface'
import {WispInputPage} from './wisp-input'

@Component({
  templateUrl: 'build/pages/smart-router/router-conf/wan-conf.html',
  providers:[RouterInterface]
})
export class WanConfPage {

    conf:any={
        mode:2+""
    }
    currentMode:number;
    wifiList=[];
    beFirstEnter=false;

  constructor(private alertController:AlertController ,private loadingController:LoadingController ,private toastController:ToastController,private viewController:ViewController,private navCtrl: NavController,private modalController: ModalController,private api:RouterInterface) {
      
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
            this.currentMode=res.mode;
            if(res.mode===4 && this.beFirstEnter==false){
                this.fetchWifiList();
                this.beFirstEnter=true;
            }
            res.mode = res.mode+"";
           this.conf=res;
           loading.dismiss();
        },error=>{
            loading.dismiss()
        })
    }
/**
 * 获取附近的wifi
 */
    fetchWifiList(){
        let loading = this.loadingController.create();
        loading.present();
        this.api.netApList().subscribe(res=>{
            if(res.error===0){
                res.aplist.map(r=>{
                    r.signal=parseInt(((r.dbm-1)/20+1)+"");
                    if(r.ssid==='BRAINHUNT'){
                        r.connected=true;
                    }
                });
                this.wifiList=res.aplist;
            }else {
                this.toastController.create({
                    message:'获取失败',
                    duration:1000
                });  
            }
            loading.dismiss();
        },error=>{
            this.toastController.create({
                message:'获取失败',
                duration:1000
            });
            loading.dismiss();
        })
    }
    /**
     * 中集wifi选择
    */
    wifiSelect(wifi){
        if(wifi.ssid==this.conf.ssid&&wifi.channel==this.conf.channel&&wifi.security==this.conf.security){
            this.toastController.create({
                message:'此wifi已经在连接',
                duration:1500
            }).present();
            return;
        }
        else if(wifi.security==''){
            this.alertController.create({
                title:'提醒',
                subTitle:'此设备有安全隐患，是否继续连接？',
                buttons:[
                    {
                        title:'取消'
                    },{
                        title:'连接',
                        handler:()=>{
                            this.conf.ssid=wifi.ssid;
                            this.conf.security=wifi.security;
                            this.conf.key="";
                            this.conf.channel=wifi.channel;
                            this.saveConf();
                        }
                    }
                ]
            });
            
        }
        else{ 

            let prompt = this.alertController.create({
            title:'验证',
            message:'输入 '+wifi.ssid+' 的密码',
            inputs:[
                {
                name:'password',
                placeholder:'密码',
                type:'password'
                }
            ],
            buttons:[
                {
                text:'取消',
                hander:data=>{
                    console.log('Cancel clicked');
                }
                },{
                    text:'连接',
                    handler:data=>{
                        console.log(data);
                        if(data.password==null||data.password==''||data.password.length<6){
                            this.toastController.create({
                                message:'密码输入有误，必须大于8位',
                                duration:1500
                            }).present();
                            return false;
                        }
                        this.conf.ssid=wifi.ssid;
                        this.conf.security=wifi.security;
                        this.conf.key=data.password;
                        this.conf.channel=wifi.channel;
                        this.saveConf();

                    }
                }
            ]
            });
            prompt.present();
            //let wifiApPage = this.modalController.create(WispInputPage);
            //wifiApPage.present();
        }
    }
}
