import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  repository;
  readmeContent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {
    this.activatedRoute.params.subscribe(data => {
      this.getRepositoryDetail(data['owner'], data['repository'])
    })
  }

  getRepositoryDetail(owner, repository) {
    this.apiService.getRepositoryDetail(owner, repository)
      .subscribe(
        data => {
          console.log(data);
          this.repository = data;
          this.getReadmeContent(data['owner']['login'], data['name'], data['default_branch'])
        },
        error => {
          console.log(error)
        }
      )
  }

  getReadmeContent(owner, repository_name, default_branch){
    this.apiService.getReadmeContent(owner, repository_name, default_branch)
    .subscribe(
      data => {
        console.log(data);
        this.readmeContent = data
      },
      error => {
        console.log(error)
        this.readmeContent = error['error']['text']
      }
    )
  }

  ngOnInit() {
  }

}
