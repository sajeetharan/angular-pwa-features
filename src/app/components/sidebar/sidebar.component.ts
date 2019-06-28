import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  navItems: any[] = [];
  @Input()
  isOpen: boolean;

  @Output()
  toggleSidebar = new EventEmitter<any>();

  isCollapsed: boolean;

  constructor(private router: Router) { }

  callToggleSidebar() {
    this.toggleSidebar.emit();
  }

  isSelected(routerLink) {
    if (routerLink[0] == this.router.url) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
    this.navItems.push(
      { icon: 'fa-user', routerLink: ['/profile'], text: 'Profile' },
      { icon: 'fa-folder', routerLink: ['/repos'], text: 'All Repositories' }
    );
  }

}
