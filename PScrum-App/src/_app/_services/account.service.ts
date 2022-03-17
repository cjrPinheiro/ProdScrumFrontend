import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { User } from '@app/_models/Identity/user';
import { UserExisting } from '@app/_models/Identity/userExisting';
import { environment } from '@environments/environment';
import { Observable, ReplaySubject } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  private currentUserSource = new ReplaySubject<User | null>(1);
  public currentUser$ = this.currentUserSource.asObservable();

  baseUrl = environment.baseApiUrl + 'api/account/';

  constructor(private http: HttpClient) { }

  public login(model: any): Observable<void>{
    return this.http.post<User>(this.baseUrl + 'login', model).pipe(
      take(1),
      map((response: User) => {
        if(response){
          this.setCurrentUser(response);
        }
      })
      );
  }

  public logout(): void {

    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    //this.currentUserSource.complete();

  }

  public register(user: User): Observable<void> {
    return this.http.post<User>(this.baseUrl + 'register', user).pipe(
      take(1),
      map((response: User) => {
        const user = response;
        if(user){
           this.setCurrentUser(user);
        }
      })
      );

  }

  public setCurrentUser(user: User) : void{

    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  public getUser(): Observable<UserExisting>{
    return this.http.get<UserExisting>(this.baseUrl + 'getuser').pipe(take(1));
  }
  
  public updateUser(userUpt: UserExisting): Observable<void> {
    return this.http.put<UserExisting>(this.baseUrl, userUpt).pipe(
      take(1),
      map((user: UserExisting) => {
          this.setCurrentUser(user);
        }
      )
    );
  }

}
