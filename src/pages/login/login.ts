import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { CorePage } from '../core/core';
import { Globals } from '../../providers/globals';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

	login = {
		username: '',
		password: ''
	};

	constructor(public navCtrl: NavController, public navParams: NavParams, public globals: Globals) {
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
			this.globals.setSensorMeasurements().then(() => {
				this.navCtrl.setRoot(CorePage);
			}).catch(() => {
			});
		}
	}
}
