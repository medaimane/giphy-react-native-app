import {AjaxResponse} from 'rxjs/ajax';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AjaxCreationMethod} from 'rxjs/internal/observable/dom/AjaxObservable';
import {NetworkingServiceConfig} from './NetworkingServiceConfig';
import {NetworkingService} from './NetworkingService';
import {Dict} from '../models/Dict';

export enum AjaxMethod {
  GET = 'GET',
  // POST, PUT...
}

export class NetworkingServiceImpl implements NetworkingService {
  constructor(
    private readonly ajaxCreationMethod: AjaxCreationMethod,
    private readonly configuration: NetworkingServiceConfig
  ) {}

  getJSON<T>(endpoint: string, params?: string, headers?: Dict): Observable<T> {
    const url = this.buildURL(endpoint, params);

    return this.sendRequest(url, AjaxMethod.GET, headers).pipe(
      map((response) => {
        log(url, response);

        return response.response;
      }),
      catchError((error) => {
        logError(url, error);

        return throwError(error);
      })
    );
  }

  sendRequest(
    url: string,
    method: AjaxMethod,
    headers?: Dict,
    body?: Dict
  ): Observable<AjaxResponse> {
    return this.ajaxCreationMethod({
      url,
      method,
      headers,
      body,
      timeout: this.configuration.timeout,
    });
  }

  buildURL(endpoint: string, params?: string) {
    const {baseUrl, apiKey} = this.configuration;

    if (!apiKey) {
      throw new Error('API_KEY is not available!');
    }

    return baseUrl + '/' + endpoint + '?api_key=' + apiKey + (params ?? '');
  }
}

const log = <T>(url: string, data: T) => console.log(`[URL: ${url}]`, data);
const logError = (url: string, err: Error) =>
  console.error(`[URL: ${url}]`, err);
