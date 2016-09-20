import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {LocalUtiils} from '../../utils/Local'
import 'rxjs/add/operator/map';

/*
  Generated class for the RouterInterface provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class RouterInterface {
  static proxyHost =  'http://localhost:8200/proxy/';
  //192.168.8.1/protocol.csp?system=system&opt=login&function=set&usrid=93279E3308BDBBEED946FC965017F67A
  static REQUEST_URL='protocol.csp';

  static API={
    system:{
      login:['system','login','set'],//登录
    },
    sys: {
      main:['system','main','get'],//获取主页内容
    },
    net:{
      wan_conf:['net','wan_conf','get'],//获取外网配置信息
      wan_conf_set:['net','wan_conf','set'],//获取外网配置信息
      ap_list:['net','ap_list','get'],//后去附近的wifi
      wifi_ap:['net','wifi_ap','get'],//获取已连接wifi
      wifi_ap_set:['net','wifi_ap','set']//连接wifi
    }

  }
  
  host:string;
  constructor(private http: Http) {
    LocalUtiils.getLocal().get("routerIp").then((result)=>{
      this.host=result||"192.168.8.1";
    });
  }
/**
 * 登录
 */
  login(usrid){
    return this.http.get(this.mergeUrl(RouterInterface.API.system.login,{usrid:usrid})).map(res => res.json());
  }
/**
 * 获取主页内容
 * return
 */
 sysMain(login){
   return this.http.get(this.mergeUrl(RouterInterface.API.sys.main,{login:login})).map(res=> res.json());
 }
/**
 * 获取外网端口配置信息
 * 返回：19
 */
netWanConf(){
  return this.http.get(this.mergeUrl(RouterInterface.API.net.wan_conf,{})).map(res => res.json());
}

/**
 * 获取外网端口配置信息
 * 返回：19
 */
netWanConfSet(conf){
  delete conf.opt;
  delete conf.fname;
  delete conf['function'];
  let url = this.mergeUrl(RouterInterface.API.net.wan_conf_set,conf);
  return this.http.get(url).map(res => res.json());
}
/**
 * 获取附近的wifi列表
 */
netApList(){
   let url = this.mergeUrl(RouterInterface.API.net.ap_list,{});
    return this.http.get(url).map(res => res.json());
}
/**
 * 获取已连接wifi
 */
netWifiAp(){
    let url = this.mergeUrl(RouterInterface.API.net.wifi_ap,{});
    return this.http.get(url).map(res => res.json());
}

  /**
  * 合并url
  * http://192.168.8.1/protocol.csp?fname=system&opt=login&function=set&usrid=00112233445566778899AABBCCDDEEFF
  */
  mergeUrl(sysParams:string[],otherParam:{}){
  
  let url = RouterInterface.proxyHost+this.host+"/"+RouterInterface.REQUEST_URL+"?fname="+sysParams[0]+"&opt="+sysParams[1]+"&function="+sysParams[2];
  //let url = "http://"+this.host+"/"+RouterInterface.REQUEST_URL+"?fname="+sysParams[0]+"&opt="+sysParams[1]+"&function="+sysParams[2];
    for(let key in otherParam){
      url+="&"+key+"="+otherParam[key];
    }
    return url;
  }
}

