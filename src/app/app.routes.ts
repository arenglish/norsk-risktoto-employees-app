import { Routes } from '@angular/router';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';

export const routes: Routes = [
    {
        path: 'employee/:employeeId',
        component: EmployeeDetailsComponent,
    },
];
