import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";

import {
  CreateEventComponent,
  EventDetailsComponent,
  EventRouteActivatorService,
  EventService,
  EventsListComponent,
  EventsListResolverService,
  EventThumbnailComponent
} from './events/index';

import {EventsAppComponent} from './events-app.component';
import {NavbarComponent} from "./nav/navbar.component";
import {ToastrService} from './common/toastr.service';
import {appRoutes} from "../routes";
import {Error404Component} from "./errors/404.component";
import {AuthService} from "./user/auth.service";

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    CreateEventComponent,
    NavbarComponent,
    Error404Component
  ],
  providers: [
    EventService,
    ToastrService,
    EventRouteActivatorService,
    EventsListResolverService,
    AuthService,
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState
    }
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule {
}

export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty) {
    return window.confirm('You have not saved this event, do you really want to cancel?');
  }
  return true;
}
