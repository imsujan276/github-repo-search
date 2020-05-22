import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Output() search = new EventEmitter();

  data = {
    searchItem : '',
    perPage: 25,
    sortBy: '',
  }

  constructor() { }

  ngOnInit() {
  }

  onSearch() {
    console.log(this.data)
    if(this.data.searchItem.toString().length == 0) return;
    this.search.emit(this.data);
  }

  onPerPageChange(perPage){
    this.data.perPage = perPage;
    this.onSearch();
  }

  onSortByChange(sortBy){
    this.data.sortBy = sortBy;
    this.onSearch();
  }

}
