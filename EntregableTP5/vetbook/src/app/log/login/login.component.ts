import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const PAW_QUANTITY: number = 4;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    pawPrints: boolean[] = [false, false, false, false, false, false, false, false, false, false];
    timer: any;

    letters: String[] = ["v", "e", "t", "b", "o", "o", "k"];
    vetbook: String = "";

    constructor(private router: Router) { }

    ngOnInit(): void {
        this.run();
    }

    ngOnDestroy() {
        clearInterval(this.timer);
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

    run() {
        let cont = 0;
        let paw = 0;
        this.timer = setInterval(() => {
            if (paw > 10) {
                clearInterval(this.timer);
                paw = 7;
                this.timer = setInterval(() => {
                    if (paw > 10) {
                        clearInterval(this.timer);
                        this.write();
                    } else {
                        this.pawPrints[paw] = false;
                        paw++;
                        if (paw == 9)
                            paw++;
                    }
                }, 300);
            } else {
                this.pawPrints[paw] = true;
                if (cont == PAW_QUANTITY) {
                    this.pawPrints[paw - PAW_QUANTITY] = false;
                    cont--;
                }
                cont++;
                paw++;
            }
        }, 300);

    }
    write() {
        let cont = 0;
        this.timer = setInterval(() => {
            if (cont >= this.letters.length)
                clearInterval(this.timer);
            else {
                this.vetbook = this.vetbook + '' + this.letters[cont];
                cont++;
            }
        }, 100);
    }

}
