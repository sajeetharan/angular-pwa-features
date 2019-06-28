import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackendApiService } from '../../service/backend-api/backend-api.service';
import { BroadcastService } from '../../service/broadcast-service/broadcast.service';
import { Repository } from '../../model/repository';
import { Subscription } from 'rxjs';
import { CustomError } from '../../model/customError';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent implements OnInit, OnDestroy {

  reposList: Repository[] = [];
  reposPartialList: Repository[] = [];
  sub: Subscription = null;
  customError: CustomError = null;
  pageSize: number = 10;
  loading: boolean;
  spinnerColor = "#007bff";

  constructor(private backendApiService: BackendApiService,
    private broadcastService: BroadcastService) {
    // listening to data sent via send method of the broadcastService
    this.sub = this.broadcastService.getData().subscribe((event) => {
      this.reposList = [];
      this.reposPartialList = [];
      this.getRemoteData(event.text);
    });
  }

  ngOnInit() {
    this.getRemoteData();
  }

  ngOnChanges() {
    this.paginate(1);
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  getRemoteData(username?: string) {
    this.loading = true;
    this.customError = null;
    if (!username) {
      username = this.backendApiService.userDefault;
    } else {
      this.backendApiService.userDefault = username;
    }
    this.backendApiService.findReposByUsername(username)
      .subscribe((data) => {
        this.reposList = data;
        this.paginate(1);
        this.loading = false;
      },
        (error) => {
          this.customError = error;
          this.loading = false;
        });
  }

  paginate(currentPage: number) {
    currentPage = currentPage - 1;
    const startIndex = currentPage * this.pageSize;
    const endIndex = (currentPage + 1) * this.pageSize;
    this.reposPartialList = this.reposList.slice(startIndex, endIndex);
  }

}
