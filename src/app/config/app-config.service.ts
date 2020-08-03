import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  baseUrl = 'http://hn.algolia.com/api/';
}
