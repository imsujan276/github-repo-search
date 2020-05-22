import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  totalRepositories = 1;
  page = 1;
  repositories = [];
  loading = false;
  searchItem = '';
  perPage = 25;
  sortBy = '';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() { 
  }

  onSearch(){
    this.searchRepository()
  }

  searchGithub(event){
    console.log(event)
    this.searchItem = event['searchItem'];
    this.perPage = event['perPage'];
    this.sortBy = event['sortBy'];
    this.page = 1;
    this.searchRepository()
  }

  searchRepository(){
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

   gotoDetailsPage(owner, repository_name){
    this.router.navigate(['/repository/'+owner+"/"+repository_name])
   }

}
