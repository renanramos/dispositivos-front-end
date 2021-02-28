import { Component, OnInit } from '@angular/core';
import { SearchService } from '../shared/service/search-service/search-service.service';

@Component({
	selector: 'device-device-search',
	templateUrl: './device-search.component.html',
	styleUrls: ['./device-search.component.css']
})
export class DeviceSearchComponent implements OnInit {
	searchModelo = '';

	constructor(private searchService: SearchService) {}

	ngOnInit() {}

	onSearchDevice() {
		this.searchService.searchedValue(this.searchModelo);
	}
}
