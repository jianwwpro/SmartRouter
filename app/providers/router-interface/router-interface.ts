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
  return this.http.get(this.mergeUrl(RouterInterface.API.net.wan_conf,{})).map(res => res.json());
}

  /**
  * 合并url
  * http://192.168.8.1/protocol.csp?fname=system&opt=login&function=set&usrid=00112233445566778899AABBCCDDEEFF
  */
  mergeUrl(sysParams:string[],otherParam:{}){
    let url = "http://"+this.host+"/"+RouterInterface.REQUEST_URL+"?system="+sysParams[0]+"&opt="+sysParams[1]+"&function="+sysParams[2];
    for(let key in otherParam){
      url+="&"+key+"="+otherParam[key];
    }
    return url;
  }
}

