import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class SensorsService extends AuthService {

    constructor(public api: Api) { 
        super();
    }

    /**
     * Send a GET request to get sensors
     * @param body json object
     */
    getSensors(params?: any) {
        // set headers
        let headers = this.getHeaders();

        let promise = new Promise((resolve, reject) => {
            this.api.get('sensors', params ? params : {}, { headers} ).subscribe((res: any) => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
        });

        return promise;
    }

    /**
     * Send a GET request to get getMeasurements
     * @param body json object
     */
    getMeasurements(params?: any) {
        // set headers
        let headers = this.getHeaders();

        let promise = new Promise((resolve, reject) => {
            this.api.get('SensorMeasurements', params ? params : {}, { headers} ).subscribe((res: any) => {
                resolve(res.value);
                console.log("res");
                console.log(res);
            }, (err) => {
                reject(err);
            });
        });

        return promise;
    }

    /**
     * Send a GET request to get a sensor by id
     * @param {number} id contract id
     */
    getSensorByID(id: number) {

        // set params to Filter by ID    
        let params = {
            "filters[id]": id
        };

        return this.getSensors(params);
    }

}
