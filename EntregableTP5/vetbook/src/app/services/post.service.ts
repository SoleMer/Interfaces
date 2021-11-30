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
        usersIdLiked: [],
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
        usersIdLiked: [],
        commentsList: [],
        usersIdShared: [],
    }, //agregar más posts
]

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
            commentsList: [],
            usersIdShared: [],
        };
    }

    likeUp(postId: number) {
        let post: Post = this.getPost(postId);
        let userId = localStorage.getItem('userId');
        if (userId != null) {
            post.usersIdLiked.push(parseInt(userId));
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
}
