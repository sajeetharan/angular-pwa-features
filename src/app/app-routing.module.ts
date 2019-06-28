import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { RepositoryListComponent } from './components/repository-list/repository-list.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/profile',
    pathMatch: 'full'
  },
  {
    path: 'profile',  
    component: ProfileComponent,
  },
  {
    path: 'repos',
    component: RepositoryListComponent        
  } 
];

@NgModule({
  imports: [  
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}