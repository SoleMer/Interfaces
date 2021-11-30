import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-profile-header',
    templateUrl: './profile-header.component.html',
    styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent implements OnInit {

    user: User = {
        id: 1,
        name: "",
        lastname: "",
        description: "",
        profilePicture: "",
        coverPicture: "",
    }

    constructor(private userSvc: UserService) { }

    ngOnInit(): void {
        this.user = this.userSvc.getUser('1');
    }

}
