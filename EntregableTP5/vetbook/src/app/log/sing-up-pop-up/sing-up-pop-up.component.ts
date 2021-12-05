import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sing-up-pop-up',
    templateUrl: './sing-up-pop-up.component.html',
    styleUrls: ['./sing-up-pop-up.component.scss']
})
export class SingUpPopUpComponent implements OnInit {

    timer: any;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
        private router: Router) { }

    ngOnInit(): void {
    }

    ok() {
        localStorage.setItem('userId', '1');
        this.timer = setTimeout(() => {
            this.redirect(`vet`);
        }, 100);
    }

    redirect(path: string) {
        this.router.navigate([path]);
    }

}
