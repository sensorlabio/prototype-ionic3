import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-gear',
    templateUrl: 'gear.html'
})
export class GearPage {
    gears: any = [
        {
            gear: "Fender Strat - Gilmour",
            temp: 20,
            acc: 10,
            time: 180305
        },
        {
            gear: "Gibson Les Paul - 59 Reissue Custom",
            temp: 18,
            acc: 15,
            time: 1803050940
        },
        {
            gear: "",
            temp: null,
            acc: null,
            time: null
        }
    ];
    constructor(public navCtrl: NavController) {

    }

}
