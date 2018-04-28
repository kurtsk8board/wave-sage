import { Session } from './../../models/session/session.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SessionLogService } from './../../services/session-log/session-log.service';
import { ToastService } from './../../services/toast/toast.service';
import { AngularFireAuth } from "angularfire2/auth";


/**
 * Generated class for the AddSessionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-session',
  templateUrl: 'add-session.html',
})
export class AddSessionPage {

  session: Session = {
    email: '',
    location: '',
    date: '',
    rating: 1,
    notes: '',
  }

  constructor(
    private afAuth: AngularFireAuth,
  	public navCtrl: NavController, 
  	public navParams: NavParams,
	  private log: SessionLogService,
    private toast: ToastService,
	) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddSessionPage');
  }

  addSession(session:Session){
    session.email = this.afAuth.auth.currentUser.email;
  	this.log.addSession(session).then(ref => {
    this.toast.show(`${session.date} added!`);
  	this.navCtrl.setRoot('HomePage', { key: ref.key });
  	});
  }

}
