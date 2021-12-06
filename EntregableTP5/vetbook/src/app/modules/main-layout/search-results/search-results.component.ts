import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

    @Input() typeResults: String = "";
    @Input() persons: User[] = [];
    @Input() posts: Post[] = [];
    @Input() ads: Post[] = [];
    search: string = "Personas";

  constructor(private searchSvc: SearchService) { }

  ngOnInit(): void {
  }
  

}
