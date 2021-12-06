import { Injectable } from '@angular/core';
import { Post } from '../models/post';

const POSTS: Post[] = [
    {
        id: 1,
        date: new Date(), //arreglar formato de fecha
        user: {
            id: 1,
            name: "Juan",
            lastname: "Perez",
            description: "Veterinario",
            profilePicture: "../../assets/profiles-pictures/perfil6.png",
            coverPicture: "",
        },
        text: "",
        images: ["../..//assets/posts/images/img3.png"],
        video: "",
        usersIdLiked: [2,2,2,2,2,2,2,2,2,2,2,2],
        usersIdDisliked: [3],
        commentsList: [],
        usersIdShared: [],
    },
    {
        id: 2,
        date: new Date(), //arreglar formato de fecha
        user: {
            id: 2,
            name: "María",
            lastname: "García",
            description: "Aficionada",
            profilePicture: "../../assets/profiles-pictures/perfil5.png",
            coverPicture: "",
        },
        text: "Teo, te estamos buscando, te extrañamos! Por favor si alguien lo ha visto o lo tiene comunicarse al 333-3333 lo estamos esperando.",
        images: [],
        video: "",
        usersIdLiked: [1,2,3,4,5,5,5,5,5,5,55,55,55,5,5,5,5,5,5,5,5,5,5,55,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
        usersIdDisliked: [4,5,6,7,8,7],
        commentsList: [],
        usersIdShared: [2,22,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,22,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    },
    {
        id: 1,
        date: new Date(), //arreglar formato de fecha
        user: {
            id: 3,
            name: "Marta",
            lastname: "Stuart",
            description: "Veterinaria",
            profilePicture: "../../assets/profiles-pictures/perfil2.png",
            coverPicture: "",
        },
        text: "",
        images: ["../../assets/profiles-pictures/fotos/img.jpg"],
        video: "",
        usersIdLiked: [2,3,4],
        usersIdDisliked: [4,4,4],
        commentsList: [],
        usersIdShared: [],
    },
    {
        id: 1,
        date: new Date(), //arreglar formato de fecha
        user: {
            id: 1,
            name: "Cesar",
            lastname: "Millan",
            description: "Veterinario",
            profilePicture: "../../assets/profiles-pictures/perfil3.png",
            coverPicture: "",
        },
        text: "",
        images: ["../../assets/profiles-pictures/fotos/galeria.jpg"],
        video: "",
        usersIdLiked: [2,3,4,5,6,7,7,7,8],
        usersIdDisliked: [3,3,3],
        commentsList: [],
        usersIdShared: [2,2],
    },
]
const ADS: Post[] = [];
const AD: Post = {
    id: 0,
    date: new Date(), //arreglar formato de fecha
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
}

@Injectable({
    providedIn: 'root'
})
export class PostService {


    constructor() { }

    //Devuelve todos los posts, se usa en el home
    getPosts(): Post[] {
        return POSTS;
    }

    //Devuelve los post de un solo usuario, se usa en el perfil
    getPostsByUserId(userId: number): Post[] {
        return POSTS.filter(p => p.user.id === userId);
    }

    getPost(postId: number): Post {
        let post = POSTS.find(p => p.id === postId);
        if (post != null) {
            return post;
        }
        return {
            id: 0,
            date: new Date(),
            user: {
                id: 0,
                name: "",
                lastname: "",
                description: "",
                profilePicture: "",
                coverPicture: "",
            },
            text: "",
            images: [],
            video: "",
            usersIdLiked: [],
            usersIdDisliked: [],
            commentsList: [],
            usersIdShared: [],
        };
    }

    likeUp(postId: number) {
        let post: Post = this.getPost(postId);
        let userId = localStorage.getItem('userId');
        if (userId != null) {
            post.usersIdLiked.push(parseInt(userId));
            if (this.isDisliked(postId)) {
                this.dislikeDown(postId);
            }
        }
    }

    likeDown(postId: number) {
        let post: Post = this.getPost(postId);
        let userId = localStorage.getItem('userId');
        if (userId != null) {
            let i = post.usersIdLiked.indexOf(parseInt(userId));
            post.usersIdLiked.splice(i, 1);
        }
    }

    isLiked(postId: number): boolean {
        let post: Post = this.getPost(postId);
        let userId = localStorage.getItem('userId');
        if (userId != null) {
            return post.usersIdLiked.includes(parseInt(userId))
        }
        return false;
    }

    dislikeUp(postId: number) {
        let post: Post = this.getPost(postId);
        let userId = localStorage.getItem('userId');
        if (userId != null) {
            post.usersIdDisliked.push(parseInt(userId));
            if (this.isLiked(postId)) {
                this.likeDown(postId);
            }
        }
    }

    dislikeDown(postId: number) {
        let post: Post = this.getPost(postId);
        let userId = localStorage.getItem('userId');
        if (userId != null) {
            let i = post.usersIdLiked.indexOf(parseInt(userId));
            post.usersIdDisliked.splice(i, 1);
        }
    }

    isDisliked(postId: number): boolean {
        let post: Post = this.getPost(postId);
        let userId = localStorage.getItem('userId');
        if (userId != null) {
            return post.usersIdDisliked.includes(parseInt(userId))
        }
        return false;
    }

    getAd(): Post {
        return AD;
    }

    getPostsSearched(keyWord: string): Post[] {
        let posts: Post[] = [];
        POSTS.forEach(p => {
            if (!posts.includes(p)) {
                if (p.text.toLowerCase().includes(keyWord) && !posts.includes(p)) {
                    posts.push(p);
                }
                if (p.user.name.toLowerCase().includes(keyWord) && !posts.includes(p)) {
                    posts.push(p);
                }
                if (p.user.lastname.toLowerCase().includes(keyWord) && !posts.includes(p)) {
                    posts.push(p);
                }
                if (p.user.description.toLowerCase().includes(keyWord) && !posts.includes(p)) {
                    posts.push(p);
                }
            }
        });
        return posts;
    }

    getAdsSearched(keyWord: string): Post[] {
        let ads: Post[] = [];
        ADS.forEach(p => {
            if (!ads.includes(p)) {
                if (p.text.toLowerCase().includes(keyWord) && !ads.includes(p)) {
                    ads.push(p);
                }
                if (p.images[0].toLowerCase().includes(keyWord) && !ads.includes(p)) {
                    ads.push(p);
                }
                if (p.user.name.toLowerCase().includes(keyWord) && !ads.includes(p)) {
                    ads.push(p);
                }
                if (p.user.lastname.toLowerCase().includes(keyWord) && !ads.includes(p)) {
                    ads.push(p);
                }
                if (p.user.description.toLowerCase().includes(keyWord) && !ads.includes(p)) {
                    ads.push(p);
                }
            }
        });
        return ads;
    }

    itsMyPost(id: number): boolean {
        let post: Post = this.getPost(id);
        return post.user.id == 1;
    }
}
