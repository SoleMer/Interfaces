import { Component, Input, OnInit } from '@angular/core';
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
    options: String = "options";
    @Input() currentUserId: number = 0;
    @Input() filteredPosts: Post[] = [];

    constructor(private postSvc: PostService,) { }

    ngOnInit(): void {
        if (this.filteredPosts.length == 0) {
            if (this.currentUserId == 0) {
                this.posts = this.postSvc.getPosts();
            } else {
                this.posts = this.postSvc.getPostsByUserId(this.currentUserId);
            }
        } else {
            this.posts = this.filteredPosts;
        }
    }


}
