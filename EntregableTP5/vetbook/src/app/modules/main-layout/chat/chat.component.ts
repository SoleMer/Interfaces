import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private generalSvc: GeneralService) { }

  ngOnInit(): void {
      this.generalSvc.setCurrentPage("chat");
  }

}
