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
        profilePicture: "../../assets/profiles-pictures/fotos/perfil.png",
        coverPicture: "../../assets/profiles-pictures/fotos/back.png",
    },
    {
        id: 2,
        name: "María",
        lastname: "García",
        description: "Aficionada",
        profilePicture: "../../assets/profiles-pictures/perfil5.png",
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
   
    getCurrentUserProfilePicture(): String {
        let userId = localStorage.getItem('userId');
        if (typeof(userId) === "string") {
            let userIdInt = parseInt(userId);
            let user = USERS.find(u => u.id === userIdInt);
            if (user != null) {
                return user.profilePicture;
            }
        }
        return "";
    }

    getUser(userId: string | null): User {
        let id = 1;
        if (userId != null) {
            id = parseInt(userId);
        }
        let user = USERS.find(u => u.id === id);
        if (user!= null) {
            return user;
        }
        return {
            id: 0,
            name: "",
            lastname: "",
            description: "",
            profilePicture: "",
            coverPicture: "",
        }
    }

    getRecommendations(): User[] {
        let recommendations : User[] = [];
        for (let i = 1; i < 4; i++) {
            recommendations.push(USERS[1]);
        };
        return recommendations;
    }
   
}
