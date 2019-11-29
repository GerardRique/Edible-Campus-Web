import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { LoginComponent } from './login/login.component';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AdminComponent } from './admin/admin.component';
import { CampusComponent } from './campus/campus.component';
import { DataUploadComponent } from './data-upload/data-upload.component';
import { AdminEdibleTreeListingComponent } from './admin-edible-tree-listing/admin-edible-tree-listing.component';
import { DatabaseModule } from '../modules/DatabaseModule';
import { Utils } from '../modules/Utils';
import { DropZoneDirective } from './drop-zone.directive';
import { Constants } from '../modules/Constants';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    CampusComponent,
    DataUploadComponent,
    AdminEdibleTreeListingComponent,
    DropZoneDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [
    AngularFireAuth,
    DatabaseModule,
    Utils,
    Constants
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
