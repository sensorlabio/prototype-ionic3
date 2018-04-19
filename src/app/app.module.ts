import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

// Ionic-native modules
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';

import { DearestgearApp } from './app.component';
import { LoginPage } from '../pages/login/login';

// Modules
import { HomePageModule } from '../pages/core/core.module';

// Providers
import { Api, SensorsService } from '../providers/providers';
import { Values } from '../providers/values'

@NgModule({
  declarations: [
    DearestgearApp,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(DearestgearApp),
    HttpClientModule,
    HomePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    DearestgearApp,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    Values,
    Api,
    SensorsService
  ]
})
export class AppModule {}
