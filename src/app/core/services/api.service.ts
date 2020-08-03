import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppConfigService } from '../../config/app-config.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = this._appConfig.baseUrl;


  constructor(
    private _http: HttpClient,
    private _appConfig: AppConfigService
  ) { }

  api(service: string, options) {
    const {type} = options;
    switch (type) {
      case 'GET':
        return this._handleGet(service, options);
      default:
        console.log("handle default");
    }
  }

  private _handleGet(service: string, options) {
    let opts = this._prepareHTTPOptions(options);
    return this._http.get(
      (!service.includes(this.baseUrl) ?this.baseUrl : '') + service,
      opts)
  }

  private _prepareHTTPOptions(options) {
    const {data, headers, requestOptions} = options;
    let params = new HttpParams();
    for (let key in data) {
      if (data.hasOwnProperty(key) && (data[key] || data[key] === 0)) {
        if (typeof data[key] === 'object') {
          params = params.set(key, JSON.stringify(data[key]));
        } else {
          params = params.set(key, data[key]);
        }
      }
    }
    let opts = {
      params
    };
    if (headers) {
      let newHeaders = new HttpHeaders();
      for (let key in headers) {
        if (headers[key]) {
          if (typeof headers[key] === 'string') {
            newHeaders = newHeaders.append(key, headers[key]);
          } else {
            newHeaders = newHeaders.append(key, headers[key].toString());
          }
        }
      }
      (opts as any).headers = newHeaders;
    }
    if (requestOptions) {
      opts = Object.assign({}, opts, requestOptions);
    }
    return opts;
  }
}
