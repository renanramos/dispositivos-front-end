import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
	selector: 'device-span-error',
	templateUrl: './span-error.component.html',
	styleUrls: ['./span-error.component.css']
})
export class SpanErrorComponent implements OnInit {
	@Input() control: AbstractControl;
	@Input() message: string = 'Campo obrigatório';
	@Input() show: boolean = false;

	constructor() {}

	ngOnInit() {}
}
