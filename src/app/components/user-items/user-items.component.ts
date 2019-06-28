import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { User } from '../../model/user';
import { NetworkStatus } from '../../model/networkStatus';

@Component({
  selector: 'app-user-items',
  templateUrl: './user-items.component.html',
  styleUrls: ['./user-items.component.scss']
})
export class UserItemsComponent extends NetworkStatus implements OnInit, OnChanges {
    
  @Input()
  userItems: User[];
  @Input()
  title:string;
  userItemsPartial: User[];
  pageSize: number = 5;  

  constructor() { 
    super();
  }

  ngOnInit() {
    this.paginate(1);
  }

  ngOnChanges(){
    this.paginate(1);
  }

  paginate(pageNumber: number){
    pageNumber = pageNumber - 1;
    const startIndex = pageNumber * this.pageSize;
    const endIndex = (pageNumber + 1) * this.pageSize;
    this.userItemsPartial = this.userItems.slice(startIndex, endIndex);
  }

}
