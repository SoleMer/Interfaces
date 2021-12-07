import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { PostService } from 'src/app/services/post.service';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    vets: User[] = [];
    amateurs: User[] = [];
    posts: Post[] = [];
    typeResults: string = "vets";
    keyWord$: string = "";
    selected: string = "vets";

    constructor(private userSvc: UserService,
        private postSvc: PostService,
        private searchSvc: SearchService) { }

    ngOnInit(): void {
        //this.searchSvc.keword.subscribe(k => this.keyWord$ = k);
        this.keyWord$ = this.searchSvc.getKeyWord();
        this.vets = this.userSvc.getVetsSearched(this.keyWord$);
        this.amateurs = this.userSvc.getAmateursSearched(this.keyWord$);
        this.posts = this.postSvc.getPostsSearched(this.keyWord$);
    }

    changeTab(tab: string) {
        this.selected = tab;
        this.searchSvc.setTypeResult(tab);
    }
}
