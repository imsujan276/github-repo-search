import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL = "https://api.github.com/";
  private RAW_URL = "https://raw.githubusercontent.com/"

  constructor(private httpClient: HttpClient) { }

  public searchGithubRepository(searchParam, perPage, page, sortBy){
    let url = this.BASE_URL+"search/repositories?q="+searchParam+"&sort="+sortBy+"&order=desc&per_page="+perPage+"&page="+page
    return this.httpClient.get(url);
  }

  public getRepositoryDetail(owner, repository_name){
    let url = this.BASE_URL+"repos/"+owner+"/"+repository_name
    return this.httpClient.get(url);
  }

  public getReadmeContent(owner, repository_name, branch){
    let url = this.RAW_URL+owner+"/"+repository_name+"/"+branch+"/README.md"
    return this.httpClient.get(url);
  }
}
