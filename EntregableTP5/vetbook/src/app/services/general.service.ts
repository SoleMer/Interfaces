import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

    currentPage: String = "home";

  constructor() { }

  setCurrentPage(page: String) {
      this.currentPage = page;
  }

  getCurrentPage(): String {
      return this.currentPage;
  }
}
