import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

import { PagesRoutingModule } from './main-layout-routing.module';
import { HomeComponent } from './home/home.component';
import { VetComponent } from './vet/vet.component';
import { NavComponent } from 'src/app/modules/main-layout/nav/nav.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { ReactionComponent } from './posts/reaction/reaction.component';
import { ProfileComponent } from './profile/profile.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { IconComponent } from './icon/icon.component';
import { AdComponent } from './ad/ad.component';
import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { PersonListComponent } from './person-list/person-list.component';
import { AdListComponent } from './ad-list/ad-list.component';
import { ConfirmPopUpComponent } from './confirm-pop-up/confirm-pop-up.component';
import { LoadRingComponent } from './load-ring/load-ring.component';
import { Profile2Component } from './profile2/profile2.component';

@NgModule({
  declarations: [
    HomeComponent,
    VetComponent,
    NavComponent,
    PostListComponent,
    ReactionComponent,
    ProfileComponent,
    NewPostComponent,
    ProfileHeaderComponent,
    RecommendationsComponent,
    IconComponent,
    AdComponent,
    SearchComponent,
    SearchResultsComponent,
    PersonListComponent,
    AdListComponent,
    ConfirmPopUpComponent,
    LoadRingComponent,
    Profile2Component,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
  ]
})
export class PagesModule { }
