import { Component, Input, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
    selector: 'app-reaction',
    templateUrl: './reaction.component.html',
    styleUrls: ['./reaction.component.scss']
})
export class ReactionComponent implements OnInit {

    @Input() type: String = "";
    @Input() quantity: number = 0;
    @Input() postId: number = 0;
    pathImg: String = "";

    constructor(private postSvc: PostService) { }

    ngOnInit(): void {
        if (this.type == "like") {
            this.pathImg = "../../../../../assets/posts/megusta.svg";
        } else if (this.type == "comment") {
            this.pathImg = "../../../../../assets/posts/comentar.svg";
        } else if (this.type == "share") {
            this.pathImg = "../../../../../assets/posts/compartir.svg";
        }
    }

    react() {
        if (this.type == "like") {
            if (this.postSvc.isLiked(this.postId)) {
                this.postSvc.likeDown(this.postId);
                this.pathImg = "../../../../../assets/posts/megusta.svg";
            } else {
                this.postSvc.likeUp(this.postId);
                this.pathImg = "../../../../../assets/posts/megustalleno.svg";
            }
        } else if (this.type == "comment") {
            
        } else if (this.type == "share") {
            
        }
    }

    hover(event: Event) {
        console.log(event)
        if (this.type == "like") {
            this.pathImg = "../../../../../assets/posts/megustalleno.svg";
        } else if (this.type == "comment") {
            this.pathImg = "../../../../../assets/posts/comentar.svg";
        } else if (this.type == "share") {
            this.pathImg = "../../../../../assets/posts/compartir.svg";
        }
    }

}
