import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { AppComponent }   from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { HeroesModule }   from './hero/heroes.module';
import { CrisisCenterModule } from './crisis-center/crisis-center.module';
import { routing, appRoutingProviders } from './app.routes';

import { Logger } from './logger.service';

@NgModule({
  imports:      [
    BrowserModule,
    routing,
    HeroesModule,
    CrisisCenterModule
  ],
  declarations: [AppComponent, DashboardComponent],
  providers: [appRoutingProviders,Logger],
  bootstrap:    [AppComponent]
})
export class AppModule {}