import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { map, tap, filter } from 'rxjs/operators';
import * as _ from 'lodash';



interface State {
    page: number;
    pageSize: number;
}


@Injectable({
    providedIn: 'root'
})
export class FrontPageService {
    private _loading$ = new BehaviorSubject<boolean>(true);
    private _newsList$ = new BehaviorSubject<any[]>([]);
    private _total$ = new BehaviorSubject<number>(0);

    private _state: State = {
        page: 1,
        pageSize: 20
    };

    constructor(private _apiService: ApiService) {


    }

    get newsList$() { return this._newsList$.asObservable(); }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }

    set page(page: number) { this._set({ page }); }
    set pageSize(pageSize: number) { this._set({ pageSize }); }

    getNewsList() {
        let options = {
            type: 'GET',
            data: {
                page: this.page,
                tags: 'story'
            }
        }
        return this._apiService.api('v1/search_by_date', options).pipe(
            tap((res) => console.log('res>>>>>>>>', res)),
            map((res: any) => res.hits),
            map((payload) => {
                let transformed = payload.map((p) => {
                    return {
                        ...p,
                        hide: this.getValueFromlocalStorage(p.created_at_i, 'hide'),
                        votes_count: this.getValueFromlocalStorage(p.created_at_i, 'votes_count'),
                        url_origin: this.getUrlOrgin(p.url)
                    }
                })
                return transformed;
            }),
            map((payload) => {
                let transformed = payload.filter((p) => !p.hide)
                return transformed;
            }),
            tap((payload) => this._newsList$.next(payload)),
            map((payload) => {
                let transformed = payload.map((p) => {
                    return [p.created_at_i, p.votes_count]
                });
                return transformed;
            }),
            tap((chartData) => console.log("chartData", chartData)),
        ).subscribe();
    }

    getValueFromlocalStorage(key, property) {
        let space;
        try {
            space = JSON.parse(localStorage.getItem('front_page_table'))
        } catch (e) {
            space = localStorage.setItem('front_page_table', JSON.stringify({}));
            space = JSON.parse(localStorage.getItem('front_page_table'))
        };
        if (space && space[key]) {
            if (!space[key][property]) {
                space[key][property] = 0
                localStorage.setItem('front_page_table', JSON.stringify(space));
                return 0;
            }
            return space[key][property];
        } else {
            space[key] = {};
            space[key][property] = 0
            localStorage.setItem('front_page_table', JSON.stringify(space));
            return space[key][property];
        }
    }

    setValueTolocalStorage(key, property, value) {
        let space;
        try {
            space = JSON.parse(localStorage.getItem('front_page_table'))
        } catch (e) {
            space = localStorage.setItem('front_page_table', JSON.stringify({}));
            space = JSON.parse(localStorage.getItem('front_page_table'))
        };
        if (space && space[key]) {
            if (!space[key][property]) {
                space[key][property] = value
            } else {
                space[key][property] = value;
            }
            localStorage.setItem('front_page_table', JSON.stringify(space));
        } else {
            space[key] = {};
            space[key][property] = value
            localStorage.setItem('front_page_table', JSON.stringify(space));
        }
    }


    getUrlOrgin(url) {
        if (!url) {
            return;
        }
        let pathArray = url.split('/');
        let protocol = pathArray[0];
        let host = pathArray[2];
        return protocol + '//' + host;
    }


    private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
    }
}
