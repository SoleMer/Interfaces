import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    userId = 0;

    constructor(private generalSvc: GeneralService) { }

    ngOnInit(): void {
        this.generalSvc.setCurrentPage("home");
    }

}
