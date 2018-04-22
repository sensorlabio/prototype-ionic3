import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Values } from '../../../providers/values';
import { PlacesPage } from '../places/places';

@Component({
    selector: 'page-gear',
    templateUrl: 'gear.html'
})
export class GearPage {

    constructor(public navCtrl: NavController, public values: Values) {
        console.log(this.values.measurement_groups);
    }

    viewMapDetail(index) {
        this.navCtrl.push(PlacesPage, {index: index});
    }
}
