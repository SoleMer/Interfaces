import { Injectable } from '@angular/core';
import { Post } from '../models/post';

const POSTS: Post[] = [
    {
        id: 1,
        date: new Date(), //arreglar formato de fecha
        userId: 1,
        userName: "Nombre Usuario",
        text: "Hola mundo!",
        images: [],
        video: "",
        usersIdLiked: [],
        commentsList: [],
        usersIdShared: [], 
    } //agregar más posts
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
      return POSTS.filter(p => p.userId === userId);
  }
}
