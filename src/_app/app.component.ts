import { Component } from '@angular/core';
import { User } from './_models/Identity/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CjEvents-App';
  constructor(private accountService: AccountService){}

  ngOnInit(): void{
    this.setCurrentUser();
  }

  setCurrentUser(): void{
    let user: User | null;
    if(localStorage.getItem('user')){
      user = JSON.parse(localStorage.getItem('user') ?? '{}' );
    }else{
      user = null;
    }
    if(user){
       this.accountService.setCurrentUser(user);
    }
    
  }
}
