import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL = "https://api.github.com/";
  private RAW_URL = "https://raw.githubusercontent.com/"

  constructor(private httpClient: HttpClient) { }

  /*
    Search for the Github repository that matches the given criteria
    searchparam: search query
    perPage: Items to display per page
    page: page number
    sortBy: parameter to soet the query (stars, updated, forks); if not provided, returns best matched result
    Ecample: https://api.github.com/search/repositories?q=github&sort=stars&order=desc&per_page=5&page=1
  */
  public searchGithubRepository(searchParam, perPage, page, sortBy){
    let url = this.BASE_URL+"search/repositories?q="+searchParam+"&sort="+sortBy+"&order=desc&per_page="+perPage+"&page="+page
    return this.httpClient.get(url);
  }


  /*
    Get github repository destail of the provided user
    owner: github user name
    repository_name: github repository name
    Ecample: https://api.github.com/repos/vmg/redcarpet
  */
  public getRepositoryDetail(owner, repository_name){
    let url = this.BASE_URL+"repos/"+owner+"/"+repository_name
    return this.httpClient.get(url);
  }


  /*
    Get github readme.md content of the provided user, repository name and branch
    owner: github user name
    repository_name: github repository name
    branch: branch name
    Ecample: https://raw.githubusercontent.com/facebook/react/master/README.md
  */
  public getReadmeContent(owner, repository_name, branch){
    let url = this.RAW_URL+owner+"/"+repository_name+"/"+branch+"/README.md"
    return this.httpClient.get(url);
  }
}
