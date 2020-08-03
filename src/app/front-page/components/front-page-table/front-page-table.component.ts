import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'front-page-table',
  templateUrl: './front-page-table.component.html',
  styleUrls: ['./front-page-table.component.scss']
})
export class FrontPageTableComponent implements OnInit {
 @Input() newsList: Observable<any[]>
 @Input() page;
 @Output() onUpvote = new EventEmitter();
 @Output() onHide = new EventEmitter();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }
  pageChange(e) {
    console.log("evet",e);
    let navigationExtra: NavigationExtras = {
      relativeTo: this._route,
      queryParams: {page: e},
      queryParamsHandling: 'merge'
  };
  this._router.navigate(
      [], navigationExtra);
  }


  upvote(news) {
   ++ news.votes_count;
   this.onUpvote.emit(news);
  }

  hide(news) {
    news.hide = 1;
    this.onHide.emit(news);
   }

}
