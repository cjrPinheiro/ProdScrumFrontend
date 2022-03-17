import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './_components/contact/contact.component';
import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { EventDetailComponent } from './_components/events/event-detail/event-detail.component';
import { EventListComponent } from './_components/events/event-list/event-list.component';
import { EventsComponent } from './_components/events/events.component';
import { ProfileComponent } from './_components/user/profile/profile.component';
import { LoginComponent } from './_components/user/login/login.component';
import { RegistrationComponent } from './_components/user/registration/registration.component';
import { UserComponent } from './_components/user/user.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './_components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path:'',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children:[
      { path: 'events', redirectTo: 'home' }, //redirectTo: 'events/list'
      {
        path: 'events', component: EventsComponent,
        children: [
          { path: 'detail/:id',redirectTo: 'home'}, //component: EventDetailComponent },
          { path: 'detail', redirectTo: 'home'},//component: EventDetailComponent },
          { path: 'list', redirectTo: 'home'},//component: EventListComponent }
        ]
      },
      { path: 'user/profile', component: ProfileComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'contact', component: ContactComponent },
    ],
  },
  { path:'user', redirectTo: 'user/profile' },
  { path:'user', component: UserComponent,
  children:[
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent }
  ]},
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
