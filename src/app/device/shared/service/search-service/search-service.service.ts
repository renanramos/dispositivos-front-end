import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SearchService {
	searchValue: Subject<string> = new Subject<string>();
	clearSearchField: Subject<string> = new Subject<string>();

	constructor() {}

	searchedValue(value: string) {
		this.searchValue.next(value);
	}

	getSearchTypedValue() {
		return this.searchValue.asObservable();
	}

	getSearchCleared() {
		return this.clearSearchField.asObservable();
	}

	clearField() {
		this.clearSearchField.next('');
	}
}
