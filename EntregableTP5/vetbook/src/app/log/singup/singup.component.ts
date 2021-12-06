import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SingUpPopUpComponent } from '../sing-up-pop-up/sing-up-pop-up.component';
import { Router } from '@angular/router';

export interface PetOption {
    name: string;
    completed: boolean;
    options?: PetOption[];
};

@Component({
    selector: 'app-singup',
    templateUrl: './singup.component.html',
    styleUrls: ['./singup.component.scss']
})


export class SingupComponent implements OnInit {

    petOptions: PetOption = {
        name: 'Seleccionar todos',
        completed: false,
        options: [
            { name: 'Animales pequeños', completed: false },
            { name: 'Animales grandes', completed: false },
            { name: 'Animales exóticos', completed: false }
        ],
    };
    allComplete: boolean = false;

    step: number = 0;

    constructor(private matDialog: MatDialog,
        private router: Router) { }

    ngOnInit(): void {
    }

    increaseStep() {
        this.step++;
    }

    decreaseStep() {
        this.step--;
    }

    updateAllComplete() {
        this.allComplete = this.petOptions.options != null && this.petOptions.options.every(t => t.completed);
    }

    someComplete(): boolean {
        if (this.petOptions.options == null) {
            return false;
        }
        return this.petOptions.options.filter(t => t.completed).length > 0 && !this.allComplete;
    }

    setAll(completed: boolean) {
        this.allComplete = completed;
        if (this.petOptions.options == null) {
            return;
        }
        this.petOptions.options.forEach(o => (o.completed = completed));
    }

    singUp() {
        this.matDialog.open(SingUpPopUpComponent, {
            data: {}
        });
    }

    signIn() {
        this.redirect(`login`);
    }

    redirect(path: string) {
        this.router.navigate([path]);
    }

}
