import { AbstractType, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';
import { GeneralService } from 'src/app/services/general.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

    users: User[] = [];
    searchClass: String = "hide";
    filter!: FormGroup;
    dataSource: User[] = [];
    profileOptionClass: String = "hide";
    selectorPage: String = "home";

    constructor(private userSvc: UserService,
        private formBuilder: FormBuilder,
        private generalSvc: GeneralService) { }

    ngOnInit(): void {
        this.updateSelectorPage();
        this.users = this.userSvc.getUsers();
        this.dataSource = this.users;
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

    applyFilter() {
        this.dataSource = [];
        this.users.forEach(u => {
            if (!this.dataSource.includes(u)) {
                if (u.name.toLowerCase().includes(this.filter.value.search.trim().toLowerCase())
                    && !this.dataSource.includes(u)) {
                    this.dataSource.push(u);
                }
                if (u.lastname.toLowerCase().includes(this.filter.value.search.trim().toLowerCase())
                    && !this.dataSource.includes(u)) {
                    this.dataSource.push(u);
                }
                if (u.description.toLowerCase().includes(this.filter.value.search.trim().toLowerCase())
                    && !this.dataSource.includes(u)) {
                    this.dataSource.push(u);
                }
            }
        });
    }

    searchToggle() {
        if (this.searchClass == "search") {
            this.searchClass = "hide";
        } else {
            this.searchClass = "search";
        }
    }

    toggleProfileOption() {
        if (this.profileOptionClass == "view") {
            this.profileOptionClass = "hide";
            this.updateSelectorPage();
        } else {
            this.profileOptionClass = "view";
        }
    }

}
