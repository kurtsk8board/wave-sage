import { Session } from './../../models/session/session.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class SessionLogService {

	private sessionLogRef;

	constructor(
		private db:AngularFireDatabase,
		private afAuth: AngularFireAuth
	){
		this.afAuth.authState.subscribe(data => {
			console.log(data.email);
			this.sessionLogRef = this.db.list<Session>(
				'session-log', 
				ref => ref.orderByChild('email').equalTo(data.email)
			);
		})
	}

	getSessionLog() {
		return this.sessionLogRef;
	}

	addSession(session:Session) {
		return this.sessionLogRef.push(session);
	}

	editSession(session: Session) {
		return this.sessionLogRef.update(session.key, session);
	}

	removeSession(session: Session) {
		return this.sessionLogRef.remove(session.key);
	}

}	