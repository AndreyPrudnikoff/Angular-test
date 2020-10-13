import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';
import {CalendarComponent, ChunkPipe} from './calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    MainComponent,
    CalendarComponent,
    ChunkPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
