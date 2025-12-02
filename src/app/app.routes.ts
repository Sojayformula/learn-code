import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { EmployeetableComponent } from './pages/employeetable/employeetable.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PagesLayoutComponent } from './pages/pages-layout/pages-layout.component';

export const routes: Routes = [

    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},

    {path: '', component: PagesLayoutComponent,
        children:[
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'employeetable', component: EmployeetableComponent},

    ]}

];
