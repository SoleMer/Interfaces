import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

    writing: boolean = false;
    userProfilePicture: String = "../../assets/profiles-pictures/perfil6.png";

  constructor(private userSvc: UserService) { }

  ngOnInit(): void {
    //  this.userProfilePicture = this.userSvc.getCurrentUserProfilePicture();
  }

  togglePosting() {
    this.writing = !this.writing;
  }
}
