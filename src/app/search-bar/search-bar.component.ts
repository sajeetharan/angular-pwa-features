import { Component, OnInit, Input } from '@angular/core';
import { BroadcastService } from '../service/broadcast-service/broadcast.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Input()
  typeSize = '';

  searchBar: string = '';

  constructor(private broadcastService: BroadcastService) { }

  ngOnInit() {
  }

  search() {
    // sending data to a component of the same level
    this.broadcastService.sendData({ text: this.searchBar });
  }

}
