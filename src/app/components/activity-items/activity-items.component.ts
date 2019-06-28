import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Activity } from '../../model/activity';

@Component({
  selector: 'app-activity-items',
  templateUrl: './activity-items.component.html',
  styleUrls: ['./activity-items.component.scss']
})
export class ActivityItemsComponent implements OnInit, OnChanges {

  @Input()
  activityItems: Activity[];

  @Input()
  title:string;

  activityItemsPartial: Activity[];

  pageSize: number = 5;

  constructor() {}

  ngOnInit() {
    this.paginate(1);
  }

  ngOnChanges(){
    this.paginate(1);
  }

  paginate(currentPage: number){  
    currentPage = currentPage - 1;
    const startIndex = currentPage * this.pageSize;
    const endIndex = (currentPage + 1) * this.pageSize;
    this.activityItemsPartial = this.activityItems.slice(startIndex, endIndex);
  }

}
