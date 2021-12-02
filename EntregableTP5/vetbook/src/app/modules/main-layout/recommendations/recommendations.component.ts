import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {

    users: User[] = [];
    addImg: String ="../../../../assets/posts/add-green.svg";
    deleteImg: String = "../../../../assets/posts/delete-x.svg";

  constructor(private userSvc: UserService) { }

  ngOnInit(): void {
    this.users = this.userSvc.getRecommendations();
  }

}
