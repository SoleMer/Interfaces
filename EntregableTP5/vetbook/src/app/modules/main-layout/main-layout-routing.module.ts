import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VetComponent } from './vet/vet.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { Profile2Component } from './profile2/profile2.component';

const routes: Routes = [
    {
		path: '',
		component: VetComponent,
		children: [
			{
				path: '',
				redirectTo: 'home',
				pathMatch: 'full',
			},
			{
				path: 'home',
				component: HomeComponent,
			},
			{
				path: 'profile',
				component: ProfileComponent,
			},
			{
				path: 'search',
				component: SearchComponent,
			},
			{
				path: 'profile2',
				component: Profile2Component,
			},
		]
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
