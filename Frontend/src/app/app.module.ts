import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import {
  faArrowRightFromBracket,
  faPenToSquare,
  faTrash,
  faCloudArrowDown,
  faClockRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApiModule } from 'src/swagger';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PricingComponent } from './pricing/pricing.component';

@NgModule({
  declarations: [AppComponent, AuthComponent, DashboardComponent, PricingComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ApiModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faArrowRightFromBracket,
      faPenToSquare,
      faTrash,
      faCloudArrowDown,
      faClockRotateLeft
    );
  }
}
