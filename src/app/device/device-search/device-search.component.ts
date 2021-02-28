import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from '../shared/service/search-service/search-service.service';

@Component({
	selector: 'device-device-search',
	templateUrl: './device-search.component.html',
	styleUrls: ['./device-search.component.css']
})
export class DeviceSearchComponent implements OnInit {
	searchModelo = '';
	searchSubscription: Subscription;

	constructor(private searchService: SearchService) {}

	ngOnInit() {
		this.subscribeToSearchService();
	}

	subscribeToSearchService() {
		this.searchSubscription = this.searchService
			.getSearchCleared()
			.subscribe(value => (this.searchModelo = ''));
	}

	onSearchDevice() {
		this.searchService.searchedValue(this.searchModelo);
	}
}
