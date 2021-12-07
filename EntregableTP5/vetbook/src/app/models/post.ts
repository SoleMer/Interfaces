import { NodeCompatibleEventEmitter } from "rxjs/internal/observable/fromEvent";
import { User } from "./user";

export interface Post {
    id: number;
    date: String;
    user: User;
    text: String;
    images: String[];
    video: String;
    usersIdLiked: number[];
    usersIdDisliked: number[];
    commentsList: Comment[];
    usersIdShared: number[];
}