import { Component, inject } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeModel } from '../../models/employee.model';
import { combineLatest, map, Observable } from 'rxjs';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FullnamePipe } from '../../pipes/fullname.pipe';

@Component({
    selector: 'nr-employees-page',
    templateUrl: './employees.component.html',
    styleUrl: './employees.component.css',
    providers: [EmployeeService],
    imports: [AsyncPipe, NgIf, RouterLink, FullnamePipe, NgClass],
})
export class EmployeesComponent {
    public $employees: Observable<EmployeeModel[]>;
    public $selectedEmployee: Observable<EmployeeModel | undefined>;

    public $isReloadingEmployees: Observable<boolean>;
    private readonly route = inject(ActivatedRoute);
    public $selectedEmployeeId: Observable<string | null> =
        this.route.paramMap.pipe(
            map((params) => {
                return params.get('selectedEmployeeId');
            })
        );

    constructor(public employeeService: EmployeeService) {
        // when component is first constructed, load all employees, but use the local storage value if available
        this.employeeService.reloadAllEmployees(true);

        // initialize properties
        this.$employees = this.employeeService.$allEmployees;
        this.$isReloadingEmployees =
            this.employeeService.$allEmployeesIsLoading;

        this.$selectedEmployee = combineLatest([
            this.$employees,
            this.$selectedEmployeeId,
        ]).pipe(
            map(([employees, selectedEmployeeId]) => {
                const employee = employees.find(
                    (e) => e.localId === selectedEmployeeId
                );
                console.info('Selected employee:');
                console.info(employee);
                return employee;
            })
        );
    }

    onReloadEmployeesButtonClicked() {
        this.employeeService.reloadAllEmployees(false);
    }

    onFlagEmployeeButtonClicked(employeeId: string) {
        const setFlagSuccess =
            this.employeeService.toggleEmployeeFlaggedStatus(employeeId);

        if (!setFlagSuccess) {
            alert('Unable to set flag for employee');
        }
    }
}
