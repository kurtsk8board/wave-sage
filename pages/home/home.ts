import { Session } from './../../models/session/session.model'
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { SessionLogService } from './../../services/session-log/session-log.service';
import { AngularFireAuth } from "angularfire2/auth";
import { ToastService } from './../../services/toast/toast.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  sessionLog$: Observable<Session[]>;

  constructor(
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    private log: SessionLogService,
    private toast: ToastService) {

    this.afAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
//        this.toast.show(`Welcome , ${data.email}!`);

        this.sessionLog$ = this.log
          .getSessionLog()  // DB List
          .snapshotChanges()  // Key and Values (access to)
          .map(
            changes => {
              return changes.map(c => ({
                key: c.payload.key, ...c.payload.val()
              }))
            }
          )
      
      } else {
        this.toast.show(`Authentication details not found!`);
      }
    })
/*
  	this.sessionLog$ = this.log
  		.getSessionLog(data.email)	// DB List
  		.snapshotChanges()	// Key and Values (access to)
  		.map(
  			changes => {
  				return changes.map(c => ({
  					key: c.payload.key, ...c.payload.val()
  				}))
  			}
  		)
*/

  }
}
