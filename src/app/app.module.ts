import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxLoadingModule } from 'ngx-loading';

import { RequestCacheService } from './service/request-cache/request-cache.service';
import { BackendApiService } from './service/backend-api/backend-api.service';
import { BroadcastService } from './service/broadcast-service/broadcast.service';

import { HttpInterceptorService } from './service/http-interceptor/http-interceptor.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RepositoryListComponent } from './components/repository-list/repository-list.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserItemsComponent } from './components/user-items/user-items.component';
import { ActivityItemsComponent } from './components/activity-items/activity-items.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UtilityService } from './service/utility/utility.service';

@NgModule({
  declarations: [
    AppComponent,
    RepositoryListComponent,
    SidebarComponent,
    ProfileComponent,
    UserItemsComponent,
    ActivityItemsComponent,
    SearchBarComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    HttpClientModule,  
    AppRoutingModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({}),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),      
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, 
      useClass: HttpInterceptorService, 
      multi: true },
    BackendApiService,
    BroadcastService,
    RequestCacheService,
    UtilityService     
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }