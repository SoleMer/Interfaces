import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    private _keyword: string = "";
    keword: BehaviorSubject<string> = new BehaviorSubject(this._keyword);

    private _typeResults: string = "";
    typeResults: BehaviorSubject<string> = new BehaviorSubject(this._typeResults);

    constructor() { }

    setKeyWord(text: string): void {
        this._keyword = text;
        this.keword.next(this._keyword);
    }

    getKeyWord(): string {
        return this._keyword;
    }

    setTypeResult(type: string): void {
        this._typeResults = type;
        this.typeResults.next(this._typeResults);
    }
}
