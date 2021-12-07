import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
    selector: 'app-ad',
    templateUrl: './ad.component.html',
    styleUrls: ['./ad.component.scss']
})
export class AdComponent implements OnInit {

    posts: Post[] = [{
        id: 0,
        date: "", //arreglar formato de fecha
        user: {
            id: 0,
            name: "Balanceados Exibal",
            lastname: "",
            description: "Publicidad",
            profilePicture: "../../assets/profiles-pictures/exibal.svg",
            coverPicture: "",
        },
        text: "",
        images: ["../../../../assets/posts/images/pub.png"],
        video: "",
        usersIdLiked: [],
        usersIdDisliked: [],
        commentsList: [],
        usersIdShared: [],
    },
    {
        id: 0,
        date: "", //arreglar formato de fecha
        user: {
            id: 0,
            name: "Dog chow",
            lastname: "",
            description: "Publicidad",
            profilePicture: "../../assets/dogChow.jpg",
            coverPicture: "",
        },
        text: "",
        images: ["../../../../assets/dogChow.jpeg"],
        video: "",
        usersIdLiked: [],
        usersIdDisliked: [],
        commentsList: [],
        usersIdShared: [],
    },
];

    constructor(private postSvc: PostService) { }

    ngOnInit(): void {
        //.post = this.postSvc.getAd();
    }

}
