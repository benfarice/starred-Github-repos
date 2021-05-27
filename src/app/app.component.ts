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


      //TO DO :: CREATE A MODEL REPO THAT HAS THE METHOD INTERVAL
      response.items.forEach((element: { pushed_at: any;interval:string;owner:any }) => {
        let date = new Date(element.pushed_at)
        let Difference_In_Time = (new Date).getTime() - date.getTime();
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        element.interval= "Submitted "+Math.round(Difference_In_Days)+" days ago by "+element.owner.login
      });
    })
  
  }

  onPageChange(page: any): void {
    this.getrepos(page);
  }
}
