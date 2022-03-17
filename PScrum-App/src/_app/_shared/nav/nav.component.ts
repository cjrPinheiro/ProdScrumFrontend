import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '@app/_services/account.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isCollapsed = true;
  constructor(private router: Router, public accountService: AccountService) { }
  
  ngOnInit(): void {
  }
  
  showMenu(): boolean{
    return this.router.url != '/user/login';
  }
  
  logout(): void{
    this.accountService.logout();
    this.router.navigateByUrl('/user/login')
    
  }
  
}
