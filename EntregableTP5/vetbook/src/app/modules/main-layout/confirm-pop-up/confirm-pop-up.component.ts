import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-pop-up',
  templateUrl: './confirm-pop-up.component.html',
  styleUrls: ['./confirm-pop-up.component.scss']
})
export class ConfirmPopUpComponent implements OnInit {
    
    action!: string;
    warning!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.action = data.action;
    this.warning = data.warning;
  }

  ngOnInit(): void {
  }

}
