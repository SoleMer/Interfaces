import { NodeCompatibleEventEmitter } from "rxjs/internal/observable/fromEvent";

export interface Post {
    id: number;
    date: Date;
    userId: number;
    userName: String;
    text: String;
    images: String[];
    video: String;
    usersIdLiked: number[];
    commentsList: Comment[];
    usersIdShared: number[];
}