import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { LoginComponent } from './auth/login/login.component';
import { AngularFireAuthProvider } from 'angularfire2/auth';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularFireDatabaseProvider } from 'angularfire2/database';

const config = {
  apiKey: 'AIzaSyDAVyyjGwsll0Wlvv-3paVM0Go4F31-Hng',
  authDomain: 'grasi-gas-diaria.firebaseapp.com',
  databaseURL: 'https://grasi-gas-diaria.firebaseio.com',
  projectId: 'grasi-gas-diaria',
  storageBucket: 'grasi-gas-diaria.appspot.com',
  messagingSenderId: '54204325718'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config)
  ],
  providers: [AngularFireAuthProvider, AngularFireDatabaseProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
