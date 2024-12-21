import { Routes } from '@angular/router';
import { LogInComponent } from './auth/log-in/log-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {path: 'auth/log-in', component: LogInComponent},
    {path: 'auth/sign-up', component: SignUpComponent},
    {path: 'dashboard', component: DashboardComponent}
];
