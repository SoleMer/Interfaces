import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

    writing: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  togglePosting() {
    this.writing = !this.writing;
  }
}
