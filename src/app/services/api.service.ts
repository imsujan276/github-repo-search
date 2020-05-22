import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL = "https://api.github.com/";

  constructor(private httpClient: HttpClient) { }

  public searchGithubRepository(searchParam, perPage, page, sortBy){
    let url = this.BASE_URL+"search/repositories?q="+searchParam+"&sort="+sortBy+"&order=desc&per_page="+perPage+"&page="+page
    return this.httpClient.get(url);
  }
}
