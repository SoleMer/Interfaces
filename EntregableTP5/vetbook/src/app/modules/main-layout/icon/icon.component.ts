import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

    @Input() img1: String = "";
    @Input() img2: String = "";
    currentImg: String = "";

  constructor() { }

  ngOnInit(): void {
      this.currentImg = this.img1;
  }

  toggleImg() {
      if (this.currentImg === this.img1) {
          this.currentImg = this.img2;
      } else {
          this.currentImg = this.img1;
      }
  }

}
