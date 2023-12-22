import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";

  export function UrlInterceptor(httpRequest: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    if (httpRequest.url.startsWith('/')) {
          return next(
              httpRequest.clone({
              url: `${environment.apiUrl}${httpRequest.url}`,
          })
        );
      }
      return next(httpRequest);
  }