import { TestBed, async, inject } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {

  let apiService: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ApiService
      ]
    })
    apiService = TestBed.get(ApiService);
    httpMock = TestBed.get(HttpTestingController)
  });

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });

  it(`should fetch posts as an Observable`, async(inject([HttpTestingController, ApiService],
    (httpClient: HttpTestingController, apiService: ApiService) => {

      apiService.searchGithubRepository('github', 5, 1, 'stars')
        .subscribe((repositories: any) => {
          expect(repositories['items'].length).toBe(5);
        });

      let req = httpMock.expectOne('https://api.github.com/search/repositories?q=github&sort=stars&order=desc&per_page=5&page=1');
      expect(req.request.method).toBe("GET");
      httpMock.verify();

    })));
});
