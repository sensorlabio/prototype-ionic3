import { Component , ViewChild ,ElementRef } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation'; 
import { SensorsService } from '../../../providers/providers';
import { Values } from '../../../providers/values';

declare var google: any;

@Component({
    selector: 'page-places',
    templateUrl: 'places.html'
})
export class PlacesPage {

    @ViewChild('map') mapElement: ElementRef;

    options : GeolocationOptions;
    currentPos : Geoposition;
    map: any;
  
    constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation : Geolocation, public plt: Platform, public values: Values) {
    }
  
    ngOnInit() {
      // this.sensor.getSensors().then((res) => {
      //   console.log(res);
      // }).catch((err) => {
      //   console.log(err);
      // })
    }
  
    ionViewDidEnter(){
      this.plt.ready().then(() => {
        if (this.navParams.get('index') != null) {
          let index = this.navParams.get('index');
          console.log(index);
          this.addMapWithSelectedGear(index);
        }
        else {
          //let length = this.values.location_groups[0].length;
          let lat = this.values.location_groups[0][0].loc.lat;
          let lng = this.values.location_groups[0][0].loc.lng - 0.08;
          this.addMap(lat, lng);
        }
      });
    }
  
    getUserPosition(){
      this.options = {
        enableHighAccuracy : true
      };
      this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {
        this.currentPos = pos;      
        console.log(pos);
        this.addMap(pos.coords.latitude,pos.coords.longitude);
      },(err : PositionError)=>{
        console.log("error : " + err.message);
      });
    }

    addMapWithSelectedGear(index) {
      let lat = this.values.measurement_groups[index].loc.lat;
      let lng = this.values.measurement_groups[index].loc.lng;
      let latLng = new google.maps.LatLng(lat, lng);
  
      let mapOptions = {
        center: latLng,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
  
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      let marker = new google.maps.Marker({
        position: latLng,
        map: this.map
      });

      let tmp = this.values.measurement_groups[index].tmp;
      let hum = this.values.measurement_groups[index].hum;
      let acc = this.values.measurement_groups[index].acc;

      //let content = coords_lat + "<br>" + coords_lng;
      let content = `Sensor ID :` + this.values.measurement_groups[index].sensor_id + `<br>`;
      if (tmp != null) content += `<small>tmperature : ` + tmp + ` °C</small><br>`;
      if (hum != null) content += `<small>hummidity : ` + hum + ` %</small><br>`;
      if (acc != null) content += `<small>acceleration : ` + acc + ` m/s<sup>2</sup></small><br>`;
      content += `<small>` + this.values.measurement_groups[index].received + `</small><br>`;
      let infoWindow = new google.maps.InfoWindow({
        content: content,
        disableAutoPan: true
      });

      infoWindow.open(this.map, marker);
      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
      });
    }
  
    addMap(lat,long){
      let latLng = new google.maps.LatLng(lat, long);
  
      let mapOptions = {
        center: latLng,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
  
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker();
  
    }
  
    addMarker(){
      // for (let i = 0; i < this.sensors.length; i++) {
      //   let coords = this.sensors[i].value;
      //   console.log(coords);
      //   let latLng = new google.maps.LatLng(coords[0],coords[1]);
      //   let marker = new google.maps.Marker({
      //     position: latLng,
      //     map: this.map
      //   });
  
      //   let content = coords[0] + "<br>" + coords[1];
      //   let infoWindow = new google.maps.InfoWindow({
      //     content: content,
      //     disableAutoPan: true
      //   });
  
      //   //google.maps.event.addListener(marker, 'load', () => {
      //   infoWindow.open(this.map, marker);
      //   //});
      // }

      for (let i = 0; i < this.values.location_groups.length; i++) {
        //let length = this.values.location_groups[i].length;
        let coords_lat = this.values.location_groups[i][0].loc.lat;
        let coords_lng = this.values.location_groups[i][0].loc.lng;
        let latLng = new google.maps.LatLng(coords_lat, coords_lng);
        let marker = new google.maps.Marker({
          position: latLng,
          map: this.map
        });

        let tmp = this.values.location_groups[i][0].tmp;
        let hum = this.values.location_groups[i][0].hum;
        let acc = this.values.location_groups[i][0].acc;
  
        //let content = coords_lat + "<br>" + coords_lng;
        let content = `Sensor ID :` + this.values.location_groups[i][0].sensor_id + `<br>`;
        if (tmp != null) content += `<small>tmperature : ` + tmp + ` °C</small><br>`;
        if (hum != null) content += `<small>hummidity : ` + hum + ` %</small><br>`;
        if (acc != null) content += `<small>acceleration : ` + acc + ` m/s<sup>2</sup></small><br>`;
        content += `<small>` + this.values.location_groups[i][0].received + `</small><br>`;
        let infoWindow = new google.maps.InfoWindow({
          content: content,
          disableAutoPan: true
        });

        infoWindow.open(this.map, marker);
        google.maps.event.addListener(marker, 'click', () => {
          infoWindow.open(this.map, marker);
        });
      }
    }


}
