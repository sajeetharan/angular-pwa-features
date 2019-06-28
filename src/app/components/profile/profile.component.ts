import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackendApiService } from '../../service/backend-api/backend-api.service';
import { BroadcastService } from '../../service/broadcast-service/broadcast.service';
import { User } from '../../model/user';
import { Activity } from '../../model/activity';
import { Subscription, forkJoin } from 'rxjs';
import { CustomError } from '../../model/customError';
import { NetworkStatus } from '../../model/networkStatus';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends NetworkStatus implements OnInit, OnDestroy {

  user: User = new User();
  activities: Activity[] = [];
  followers: User[] = [];
  following: User[] = [];
  sub: Subscription = null;
  customError: CustomError = null;
  loading: boolean;
  offline: boolean;
  spinnerColor = "#007bff";

  constructor(private backendApiService: BackendApiService,
              private broadcastService: BroadcastService) {
    super();
    // listening to data sent via send method of the broadcastService
    this.sub = this.broadcastService.getData().subscribe((event) => {
      this.user = new User();
      this.activities = [];
      this.followers = [];
      this.following = [];
      this.getRemoteData(event.text);
    });
  }

  ngOnInit() {
    this.getRemoteData();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  getRemoteData(username?: string) {
    this.customError = null;
    this.loading = true;
    if (!username) {
      username = this.backendApiService.userDefault;
    } else {
      this.backendApiService.userDefault = username;
    }
    const source = forkJoin(
      this.backendApiService.findUserByUsername(username),
      this.backendApiService.findActivitiesByUsername(username),
      this.backendApiService.findFollowersByUsername(username),
      this.backendApiService.findFollowingByUsername(username)
    );
    source.subscribe(
      (data) => {
        this.user = data[0];
        this.activities = data[1];
        this.followers = data[2];
        this.following = data[3];
        this.loading = false;
      },
      (error) => {
        this.customError = error;
        this.loading = false;
      });
  }

}
