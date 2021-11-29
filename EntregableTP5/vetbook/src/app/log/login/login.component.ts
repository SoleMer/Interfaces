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
        localStorage.setItem('userId', '1');
        this.timer = setTimeout(() => {
            this.redirect(`vet`);
        }, 100);
    }

    singup() {
        this.redirect(`singup`);
    }

    redirect(path: string) {
        this.router.navigate([path]);
    }

}
