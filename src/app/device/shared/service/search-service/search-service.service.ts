import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SearchService {
	searchValue: Subject<string> = new Subject<string>();

	constructor() {}

	searchedValue(value: string) {
		this.searchValue.next(value);
	}

	getSearchTypedValue() {
		return this.searchValue.asObservable();
	}
}
