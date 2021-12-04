import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

    @Input() users: User[] = [];
    addImg: String ="../../../../assets/posts/add-green.svg";
    deleteImg: String = "../../../../assets/posts/delete-x.svg";

  constructor(private usersSvc: UserService) { }

  ngOnInit(): void {
  }

}
