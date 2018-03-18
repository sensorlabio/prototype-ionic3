import { Component , ViewChild ,ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation'; 
import { SensorsService } from '../../providers/providers';


declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;

  options : GeolocationOptions;
  currentPos : Geoposition;
  map: any;
  sensors : any;

  constructor(public navCtrl: NavController, private geolocation : Geolocation, private sensor : SensorsService, public plt: Platform) {
  }

  ngOnInit() {
    this.sensor.getSensors().then((res) => {
      this.sensors = res;
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }

  ionViewDidEnter(){
    this.plt.ready().then(() => {
      this.sensor.getSensors().then((res) => {
        this.sensors = res;
        console.log(res);

        let lat = this.sensors[0].value[0];
        let long = this.sensors[0].value[1];
        this.addMap(lat, long);
        //this.getUserPosition();
      }).catch((err) => {
        console.log(err);
      })
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
    for (let i = 0; i < this.sensors.length; i++) {
      let coords = this.sensors[i].value;
      console.log(coords);
      let latLng = new google.maps.LatLng(coords[0],coords[1]);
      let marker = new google.maps.Marker({
        position: latLng,
        map: this.map
      });

      let content = coords[0] + "<br>" + coords[1];
      let infoWindow = new google.maps.InfoWindow({
        content: content
      });

      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
      });
    }
  }

}
