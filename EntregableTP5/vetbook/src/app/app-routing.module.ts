import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './log/login/login.component';
const routes: Routes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full',
	},
    {
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'home',
		loadChildren: () => import('./modules/main-layout/main-layout.module').then(m => m.PagesModule),
	},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
