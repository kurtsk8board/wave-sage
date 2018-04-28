import { Session } from './../../models/session/session.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SessionLogService } from './../../services/session-log/session-log.service';
import { ToastService } from './../../services/toast/toast.service';

/**
 * Generated class for the EditSessionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-session',
  templateUrl: 'edit-session.html',
})
export class EditSessionPage {
	session: Session;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	private log: SessionLogService,
  	private toast: ToastService) {
  }

  ionViewWillLoad() {
    this.session = this.navParams.get('session');
  }
 
  saveSession(session:Session){
  	this.log.editSession(session).then(()=> {
  		this.toast.show(`${session.date} saved`);
  		this.navCtrl.setRoot('HomePage');
  	});
  }

  removeSession(session: Session){
  	this.log.removeSession(session).then(()=> {
		this.toast.show(`${session.date} deleted`);
		this.navCtrl.setRoot('HomePage');
  	});
  }
}