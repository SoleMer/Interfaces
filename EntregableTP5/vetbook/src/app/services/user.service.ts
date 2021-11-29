import { Injectable } from '@angular/core';
import { User } from '../models/user';
/*
{
        id: 1,
        name: "",
        lastname: "",
        description: "",
        profilePicture: "",
        coverPicture: "",
    }
    */
const USERS: User[] = [
    {
        id: 1,
        name: "Juan",
        lastname: "Perez",
        description: "Veterinario",
        profilePicture: "",
        coverPicture: "",
    },
    {
        id: 2,
        name: "María",
        lastname: "García",
        description: "Aficionada",
        profilePicture: "",
        coverPicture: "",
    }
]; //agregar usuarios

@Injectable({
  providedIn: 'root'
})
export class UserService {
    
    constructor() { }
    
    
    getUsers(): User[] {
        return USERS;
    }
}
