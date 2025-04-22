import { Routes } from '@angular/router';
import { EmployeesComponent } from './pages/employees/employees.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
    {
        path: 'employees',
        component: EmployeesComponent,
    },
    {
        path: 'employees/:employeeId',
        component: EmployeesComponent,
    },
    {
        path: 'settings',
        component: SettingsComponent,
    },
    {
        path: 'about',
        component: AboutComponent,
    },
];
