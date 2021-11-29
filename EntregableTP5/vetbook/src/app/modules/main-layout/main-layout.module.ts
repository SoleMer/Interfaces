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
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    HomeComponent,
    VetComponent,
    NavComponent,
    PostListComponent,
    ReactionComponent,
    ProfileComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
  ]
})
export class PagesModule { }
