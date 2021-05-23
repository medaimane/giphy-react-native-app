import {Observable, of} from 'rxjs';
import {
  AjaxCreationMethod,
  AjaxRequest,
} from 'rxjs/internal/observable/dom/AjaxObservable';

export function ajaxCreationMethodWithResponseStub(): AjaxCreationMethod {
  const ajax = (request: AjaxRequest): Observable<any> => {
    if (request.method === 'GET') {
      return of({
        url: request.url,
        timeout: request.timeout,
        method: 'GET',
        response: {
          url: request.url,
          timeout: request.timeout,
          response: {},
          method: 'GET',
        },
      });
    }
    // POST, PUT ...

    return of(void 0);
  };

  return ajax as AjaxCreationMethod;
}
