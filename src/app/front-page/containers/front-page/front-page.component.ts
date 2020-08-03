import { Component, OnInit } from '@angular/core';
import { FrontPageService } from '../../services/front-page.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent implements OnInit {
  chartOptions: Highcharts.Options;
  page;
  newsList$: Observable<any[]>;
  qp: any;
  Highcharts: typeof Highcharts = Highcharts;
  chartData = [];
  constructor(
    private _frontPageService: FrontPageService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._route.queryParams.subscribe((qp) => {
      this.qp = qp;
      if (qp.page) {
        this.onPageChange(qp.page);
      }
    })
    this.newsList$ = this._frontPageService.newsList$;
    this.page = this._frontPageService.page;

    this._frontPageService.chartData$.subscribe((data)=> {
      if (data) {
        console.log("dataa", data);
        this.chartData = data;
        this.chartOptions = {
          series: [{
            data: this.chartData,
            type: 'line'
          }],
          chart: {
            backgroundColor:  'rgb(246, 246, 239)'
          }
        }
      }
    })
  }
  ngAfterViewInit() {
    if (!this.qp.page) {
      this.getNewsList();
    }
  }

  getNewsList() {
    this._frontPageService.getNewsList();
  }

  onPageChange(e) {
    this._frontPageService.page = e;
    this.getNewsList();
  }

  handleOnUpvote(e) {
    this._frontPageService.setValueTolocalStorage(e.created_at_i, 'votes_count', e.votes_count);
  }

  handleOnHide(e) {
    this._frontPageService.setValueTolocalStorage(e.created_at_i, 'hide', 1);
  }
}
