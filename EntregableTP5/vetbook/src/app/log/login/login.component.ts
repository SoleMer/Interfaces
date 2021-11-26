import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    timer: any;

    constructor(private router: Router) { }

    ngOnInit(): void {
    }

    login() {
        this.timer = setTimeout(() => {
            this.redirect(`home`);
        }, 100);
    }

    redirect(path: string) {
        this.router.navigate([path]);
    }

}
