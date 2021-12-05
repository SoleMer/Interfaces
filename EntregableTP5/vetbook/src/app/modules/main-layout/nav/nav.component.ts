import { AbstractType, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { GeneralService } from 'src/app/services/general.service';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { LoadRingComponent } from '../load-ring/load-ring.component';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

    dataSource: User[] = [];
    profileOptionClass: String = "hide";
    selectorPage: String = "home";
    timer: any;
    filter!: FormGroup;
    isLoading: boolean = false;

    constructor(private userSvc: UserService,
        private formBuilder: FormBuilder,
        private generalSvc: GeneralService,
        private searchSvc: SearchService,
        private matDialog: MatDialog) { }

    ngOnInit(): void {
        this.updateSelectorPage();
        this.filter = this.formBuilder.group({
            search: [null, null],
        });
    }

    updateSelectorPage() {
        let page = this.generalSvc.getCurrentPage();
        switch (page) {
            case "bell":
                this.selectorPage = "selector-bell";
                break;
            case "profile":
                this.selectorPage = "selector-profile";
                break;
            case "chat":
                this.selectorPage = "selector-chat";
                break;

            default:
                this.selectorPage = "selector-home";
                break;
        }
    }

    toggleProfileOption(page: string) {
        if (this.profileOptionClass == "view") {
            this.profileOptionClass = "hide";
            if (page != "") {
                this.changePage(page);
            }
        } else {
            this.profileOptionClass = "view";
        }
    }

    changePage(page: string) {
        this.generalSvc.setCurrentPage(page);
        this.updateSelectorPage();
    }

    readSearch(event: KeyboardEvent) {
        if (event.key === "Enter") {
            console.log(this.filter.value.search)   
            this.searchSvc.setKeyWord(this.filter.value.search.trim().toLowerCase());
            this.loading(`vet/search`);
            
        }
    }

    loading(path: string) {
       this.isLoading = true;
       this.timer = setTimeout(() => {
        this.redirect(path);
        this.isLoading = false;
    }, 1000);
    }

    redirect(path: string) {
        location.href = path;
    }
}
