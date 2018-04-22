import { Injectable } from '@angular/core';
import { Values } from './values';
import { SensorsService } from './providers';

@Injectable()
export class Globals {
    
    constructor(public values: Values, private sensor : SensorsService) {
    }

    setSensorMeasurements() {
        return new Promise((resolve, reject) => {
            this.sensor.getMeasurements().then((res) => {
                this.values.measurements = res;
                console.log("this.measurements");
                console.log(res);
                this.values.measurement_groups = this.getMeasurementGroups(res);
                this.values.measurement_groups.reverse();
                console.log("this.measurement_groups");
                console.log(this.values.measurement_groups);
                this.values.location_groups = this.getLocationGroups(this.values.measurement_groups);
                console.log("this.location_groups");
                console.log(this.values.location_groups);
                resolve();
            }).catch((err) => {
                console.log(err);
                reject();
            });
        });
    }


    getMeasurementGroups(measurements) {
        let measurement_groups = [];
        let m_group = {
            id: null,
            sensor_id: null,
            received: null,
            tmp: null,
            hum: null,
            acc: null,
            loc: {
                lat: null,
                lng: null
            }
        };
  
        for (let i = 0; i < measurements.length; i++) {
            //console.log(m_group.id + " : " + measurements[i].MeasurementGroup);
            if (m_group.id != null && m_group.id != measurements[i].MeasurementGroup) {
                measurement_groups.push(m_group);
                m_group = {
                    id: measurements[i].MeasurementGroup,
                    sensor_id: null,
                    received: null,
                    tmp: null,
                    hum: null,
                    acc: null,
                    loc: {
                        lat: null,
                        lng: null
                    }
                }
            }
            if (m_group.id == null) m_group.id = measurements[i].MeasurementGroup;
            m_group.sensor_id = measurements[i].Sensor_Id;
            m_group.received = measurements[i].Received.substr(0, 22);
            if (measurements[i].Type == "TMP") {
                m_group.tmp = parseInt(measurements[i].MeasurementDecimal).toFixed(2);
            }
            else if (measurements[i].Type == "HUM") {
                m_group.hum = parseInt(measurements[i].MeasurementDecimal).toFixed(2);
            }
            else if (measurements[i].Type == "ACC") {
                m_group.acc = parseInt(measurements[i].MeasurementDecimal).toFixed(2);
            }
            else if (measurements[i].Type == "LOC") {
                if (measurements[i].MeasurementText.length == 25) {
                    m_group.loc.lat = this.converttoDD(measurements[i].MeasurementText.substr(0, 12));
                    m_group.loc.lng = this.converttoDD(measurements[i].MeasurementText.substr(13));
                }
                else if (measurements[i].MeasurementText.length == 21) {
                    m_group.loc.lat = this.converttoDD(measurements[i].MeasurementText.substr(0, 10));
                    m_group.loc.lng = this.converttoDD(measurements[i].MeasurementText.substr(11));
                }
            }
            }
            if (m_group.id != null) {
                measurement_groups.push(m_group);
            }
        return measurement_groups;
    }

    getLocationGroups(measurement_groups) {
        let location_groups = [];
        for (let i = 0; i < measurement_groups.length; i++) {
            if (measurement_groups[i].loc.lat == null || measurement_groups[i].loc.lng == null) continue;
            let location_group = [];
            let is_continue = false;
            for (let j = 0; j < location_groups.length; j++) {
            if (measurement_groups[i].loc.lat == location_groups[j][0].loc.lat && measurement_groups[i].loc.lng == location_groups[j][0].loc.lng) {
                is_continue = true;
            }
            }
            if (is_continue) continue;
            
            let location = measurement_groups[i].loc;
            for (let j = i; j < measurement_groups.length; j++) {
            if (measurement_groups[i].loc.lat == measurement_groups[j].loc.lat && measurement_groups[i].loc.lng == measurement_groups[j].loc.lng) {
                location_group.push(measurement_groups[j]);
            }
            }
            location_groups.push(location_group);
        }
        return location_groups;
    }

    converttoDD(dms_str: string) {
      let dd = 0;
      let is_negative = false;
      let last_char = dms_str[dms_str.length - 1];
      dms_str = dms_str.substr(0, dms_str.length - 1);
      if (last_char == 'S' || last_char == 'W') is_negative = true;
      let dm_str = dms_str.split(".")[0];
      let s_str = dms_str.split(".")[1]
      let degrees = parseInt(dm_str.substr(0, 2));
      let minutes = parseInt(dm_str.substr(2));
      let decimal_var = 10000;
      if (s_str.length == 4) decimal_var = 100;
      let seconds = parseInt(s_str) / decimal_var;

      if (is_negative) {
        dd = - (seconds / 3600) - (minutes / 60) - degrees;
      }
      else {
        dd = (seconds / 3600) + (minutes / 60) + degrees;
      }
      return dd;
    }
}

