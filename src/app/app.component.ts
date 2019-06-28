import { Component } from '@angular/core';
import {TYPE_INFO,OFFLINE_MSG} from './constant';
import { NetworkStatus } from './model/networkStatus';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends NetworkStatus {  
  isOpen: boolean; 
  warning = TYPE_INFO;
  msgOffline = OFFLINE_MSG;  

  toggleSidebar(){
    this.isOpen = !this.isOpen;
  }

}
