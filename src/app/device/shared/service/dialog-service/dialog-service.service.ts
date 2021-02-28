import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DialogService {
	private subject = new Subject<any>();

	constructor() {}

	dialogClosed(obj: any) {
		this.subject.next(obj);
	}

	getDialogResponse(): Observable<any> {
		return this.subject.asObservable();
	}
}
