import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  totalRepositories = 1;
  page = 1;
  perPage = 25;
  repositories = [];
  searchItem='';
  loading = false;
  sortBy = ""

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() { 
  }

  onSearch(){
    this.searchRepository()
  }

  searchRepository(){
    if(this.searchItem.length < 1) return;
    this.repositories = [];
    this.loading = true;
    this.apiService.searchGithubRepository(this.searchItem, this.perPage, this.page, this.sortBy).subscribe((data: any[])=>{
      this.loading = false;
      this.totalRepositories = data['total_count']
      this.repositories = data['items'];
    }) 
  }

  previousPage(){
    this.page--;
    this.searchRepository();
  }
  
  nextPage() {
    this.page++;
    this.searchRepository();
  }

  lastPage() {
    return this.totalRepositories / this.perPage
   }

   onPerPageChange(perPage){
     console.log(perPage)
     this.perPage = perPage;
     this.page = 1;
     this.searchRepository()
   }

   onSortByChange(sortBy){
    console.log(sortBy)
    this.sortBy = sortBy;
    this.page = 1;
    this.searchRepository()
   }

}
