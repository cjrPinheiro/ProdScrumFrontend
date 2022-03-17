import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "@app/_models/Identity/user";
import { AccountService } from "@app/_services/account.service";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  test: User = {} as User;
  constructor(private accountService : AccountService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser: any = null;
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => currentUser = user);
    //currentUser = JSON.parse(localStorage.getItem('user')!);
    if(currentUser){
      req = req.clone({
        setHeaders:{
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }

    return next.handle(req);
  }

}
