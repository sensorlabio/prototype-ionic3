import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { CorePage } from '../core/core';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

	login = {
		username: '',
		password: ''
	};

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}  
	ngOnInit() {
	}

	doLogin(form: NgForm) {
		console.log(form);

		if (form.invalid) {
			if (form.controls.username.invalid) {
			} else if (form.controls.password.invalid) {
			}
		}
		else {
			this.navCtrl.setRoot(CorePage);
		}
	}
}
