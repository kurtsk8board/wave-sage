import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/user/user";
import { AngularFireAuth } from "angularfire2/auth";
import { ToastService } from './../../services/toast/toast.service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	user = {} as User;

  constructor(
    private afAuth: AngularFireAuth,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toast: ToastService) {
  }

  ionViewDidLoad() {
//    console.log('ionViewDidLoad LoginPage');
  }

  async login(user: User) {
  	try {
  		const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
//  		console.log(result);
  		if (result) {
        this.toast.show(`Welcome Back!`);
  			this.navCtrl.setRoot('HomePage');
  		}
  	}
  	catch (e) {
    	this.toast.show(`Invalid credentials entered`);
//  		console.error(e);
  	}
  }

  register(){
  	this.navCtrl.push('RegisterPage');
  }

}
