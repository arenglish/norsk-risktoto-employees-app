import { Routes } from '@angular/router';
import { EmployeesComponent } from './pages/employees/employees.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'about',
        title: 'About | HR Dashboard',
    },
    {
        path: 'employees',
        component: EmployeesComponent,
        title: 'Employees | HR Dashboard',
    },
    {
        path: 'employees/:selectedEmployeeId',
        component: EmployeesComponent,
        title: 'Employee Details | HR Dashboard',
    },
    {
        path: 'settings',
        component: SettingsComponent,
        title: 'Settings | HR Dashboard',
    },
    {
        path: 'about',
        component: AboutComponent,
        title: 'About | HR Dashboard',
    },
];
