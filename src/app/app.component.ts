import { Component } from '@angular/core';
import {COUNT, EMPTY_DATA} from "@app/config";
import {RepoService} from "@app/services";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'webapp';
  repos: any;
  notFoundMessage = EMPTY_DATA.REPO;
  reposPagination={
    current_page:1,
    total:0
  };
  itemsPerPage: any = COUNT;
  page: number=1;

  constructor(
    private _repoService: RepoService
  ) {
  }

  ngOnInit() {
    this.getrepos();
  }

  getrepos(page: number = 1) {
    this.page = page ? page : (this.page ? this.page : 1);
    
    this._repoService.getrepos(this.page).subscribe((response: any)=>{
      this.repos = response.items
      this.reposPagination.current_page=page
      this.reposPagination.total = response.total_count
    })
  
  }

  onPageChange(page: any): void {
    this.getrepos(page);
  }
}
