import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-reaction',
    templateUrl: './reaction.component.html',
    styleUrls: ['./reaction.component.scss']
})
export class ReactionComponent implements OnInit {

    @Input() type: String = "";
    @Input() quantity: number = 0;
    pathImg: String = "";

    constructor() { }

    ngOnInit(): void {
        if (this.type == "like") {
            this.pathImg = "../../../../../assets/posts/megusta.svg";
        } else if (this.type == "comment") {
            this.pathImg = "../../../../../assets/posts/comentar.svg";
        } else if (this.type == "share") {
            this.pathImg = "../../../../../assets/posts/compartir.svg";
        }
    }

}
