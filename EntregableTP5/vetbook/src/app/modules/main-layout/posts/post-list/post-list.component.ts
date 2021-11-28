import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

    posts: Post[] = [];
    like: String = "like";
    comment: String = "comment";
    share: String = "share";

    constructor(private postSvc: PostService) { }

    ngOnInit(): void {
        this.posts = this.postSvc.getPosts();
    }

}
