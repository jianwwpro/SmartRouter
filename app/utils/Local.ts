import {Storage,LocalStorage,ModalController,PopoverController} from 'ionic-angular';
import {UserCenterPage} from '../pages/user-center/user-center';
import {WifiTipPage} from '../pages/smart-router/wifi-tip';
import { Network,SQLite } from 'ionic-native';

export class LocalUtiils{
	private static local: Storage = new Storage(LocalStorage);
    private db:SQLite=new SQLite();

	constructor(){
        // this.db.openDatabase({
        // name: 'data.db',
        // location: 'default' // the location field is required
        // }).then(() => {
        //     this.db.executeSql('create table danceMoves(name VARCHAR(32))', {}).then(() => {
        // }, (err) => {
        //     console.error('Unable to execute sql: ', err);
        // });
        // }, (err) => {
        //     console.error('Unable to open database: ', err);
        // });
	}

    static getLocal():Storage{
        return this.local;
    }

}