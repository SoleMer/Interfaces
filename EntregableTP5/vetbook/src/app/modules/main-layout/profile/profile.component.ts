import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    userId = 1;

    constructor(private generalSvc: GeneralService) { }

    ngOnInit(): void {
        this.generalSvc.setCurrentPage("profile");
        /*let userId = localStorage.getItem('userId');
        if (userId != null) {
            this.userId = parseInt(userId);
        }*/
    }

}
