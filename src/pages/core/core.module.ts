import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CorePage } from './core';
import { GearPage } from './gear/gear';
import { HomePage } from './home/home';
import { MessagesPage } from './messages/messages';
import { NotificationsPage } from './notifications/notifications';
import { PlacesPage } from './places/places';

@NgModule({
  declarations: [
    CorePage,
    GearPage,
    HomePage,
    MessagesPage,
    NotificationsPage,
    PlacesPage
  ],
  imports: [
    IonicPageModule.forChild(CorePage)
  ],
  entryComponents: [
    CorePage,
    GearPage,
    HomePage,
    MessagesPage,
    NotificationsPage,
    PlacesPage
  ],
})
export class HomePageModule {}
