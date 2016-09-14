import {Component,ViewChild} from '@angular/core';
import {Storage,LocalStorage,ModalController, NavController,PopoverController,Tabs} from 'ionic-angular'
import {UserUtiils} from '../../utils/UserUtils'

//import {HomePage} from '../home/home';
//import {AboutPage} from '../about/about';
//import {ContactPage} from '../contact/contact';
import {SmartRouterPage} from '../smart-router/smart-router';
import {BusinessPage} from '../business/business';
import {MallPage} from '../mall/mall';
import {UserCenterPage} from '../user-center/user-center';
import { Network } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private local: Storage;
  private userUtils: UserUtiils;
  private smartRouterPage: any;
  private businessPage: any;
  private mallPage: any;
  private userCenterPage: any;

@ViewChild('myTabs') tabRef: Tabs;

  constructor(private modalController : ModalController,private navController:NavController,private popoverController:PopoverController) {
    this.smartRouterPage = SmartRouterPage;
    this.businessPage = BusinessPage;
    this.mallPage = MallPage;
    this.userCenterPage = UserCenterPage;
    this.local = new Storage(LocalStorage);
    //this.userUtils = new UserUtiils(this.modalController,popoverController);
    //  let disconnectSubscription = Network.onDisconnect().subscribe(() => {
    //   this.tabRef.select(0);
    // });

    // // watch network for a connection
    // let connectSubscription = Network.onConnect().subscribe(() => {
    //   this.tabRef.select(0);
    // });
  }

 
}
