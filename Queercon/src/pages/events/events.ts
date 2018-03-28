import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'events-details.html',
})

export class EventsDetailsPage {
  item;
  private webWiew: any = window;
  constructor(params: NavParams) {
    this.webWiew.AppCenter.Analytics.trackEvent('EventsPage Detail Loaded');
    this.item = params.data.item;
  }
}

    

@Component({
  template: `
<ion-header>
  <ion-navbar>
    <button ion-button menuToggle>
      <ion-icon name="menu"></ion-icon>
    </button>
    <ion-title>Events</ion-title>
  </ion-navbar>
</ion-header>

<ion-content>
  <ion-list>
    <ion-card *ngFor="let event of events" (click)="openEventDetailsPage(item)">
      <ion-card-header>
        {{ event.title }}
      </ion-card-header>
      <ion-card-content>
      {{ event.summary }}
      </ion-card-content>
    </ion-card>
  </ion-list>
</ion-content>
`
})
export class EventsPage {
  private webWiew: any = window;
  events: any[];
  constructor(public nav: NavController, http: Http) {
    this.webWiew.AppCenter.Analytics.trackEvent('EventsPage Loaded');
    let localData = http.get('assets/events.json').map(res => res.json().items);
    localData.subscribe(data => {
      this.events = data;
    })
  }

  openEventDetailsPage(item) {
    this.nav.push(EventsDetailsPage, { item: item });
  }

}