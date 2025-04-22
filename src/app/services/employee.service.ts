import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeModel } from '../models/employee.model';
import { BehaviorSubject, finalize, Observable, tap } from 'rxjs';
import { validateRandomUserApiResponse } from '../utilities/response.util';
import { RandomUserApiUserModel } from '../models/random-user-api-user.model';
import { StateProp } from '../models/state-prop.model';
import { initializeStateProp } from '../utilities/state.util';
import {
    getEmployeeFullName,
    randomApiUserModelToEmployeeModel,
} from '../utilities/employee.util';

@Injectable({
    providedIn: 'root',
})
export class EmployeeService {
    /**
     * Internal behavior subject for storing allEmployees data
     * @private
     */
    private _allEmployees: StateProp<EmployeeModel[]> = initializeStateProp<
        EmployeeModel[]
    >([], 'allEmployees');

    /**
     * Returns latest for allEmployees
     */
    public $allEmployees: Observable<EmployeeModel[]> =
        this._allEmployees.$value;
    public $allEmployeesIsLoading: BehaviorSubject<boolean> =
        new BehaviorSubject(false);

    constructor(private http: HttpClient) {}

    /**
     * Toggles the flagged status of an employee.
     *
     * Throws an error if unsuccessful.
     *
     * @param employeeId
     */
    public toggleEmployeeFlaggedStatus(employeeId: string) {
        const employeeIdx = this._allEmployees.value.findIndex(
            (employee) => employee.localId === employeeId
        );

        if (employeeIdx < 0) {
            throw new Error('Unable to find employee with id: ' + employeeId);
        }

        const employees = this._allEmployees.value;
        const employeeRef = employees[employeeIdx];

        if (!employeeRef) {
            throw new Error(
                'Unable to get employee reference with id: ' + employeeId
            );
        }

        const employee = {
            ...employeeRef,
            flagged: !employeeRef.flagged,
        };

        employees.splice(employeeIdx, 1, employee);

        this._allEmployees.setValue(employees);
        console.log(
            'Setting flag for employee: ',
            employeeId,
            ' to ',
            employee.flagged
        );

        if (employee.flagged) {
            this._sendFlaggedEmployeeEmail(employeeId);
        }

        return true;
    }

    private getEmployeeById(employeeId: string) {
        return this._allEmployees.value.find(
            (employee) => employee.localId === employeeId
        );
    }

    private _sendFlaggedEmployeeEmail(employeeId: string) {
        const employee = this.getEmployeeById(employeeId);

        if (!employee) {
            console.warn(
                'Failed to send email for employee with id: ',
                employeeId
            );
            return;
        }

        const employeeFullName = getEmployeeFullName(employee.name);
        this.http
            .post('https://example.com/api/email', {
                to: 'admin@example.com',
                from: 'hrdashboard@example.com',
                subject: `Employee ${employeeFullName} flagged`,
                body: `Employee ${employeeFullName} has been flagged.
            Employee info:
            Full name: ${employeeFullName}
            Employee ID: ${employeeId}`,
            })
            .subscribe({
                error: console.error,
            });
        console.info(
            'Sent employee flagging email for employee with id: ',
            employeeId
        );
    }

    /**
     * Loads all employees into service state.
     * @param skipIfHasEmployees
     */
    public reloadAllEmployees(skipIfHasEmployees: boolean = true): void {
        if (this._allEmployees.value.length > 0 && skipIfHasEmployees) {
            return;
        }

        console.info('Loading all employees...');
        this.$allEmployeesIsLoading.next(true);
        this.http
            .get<unknown>(
                'https://randomuser.me/api/?results=50&seed=hrdashboard'
            )
            .pipe(
                tap((response) => {
                    const validated =
                        validateRandomUserApiResponse<RandomUserApiUserModel[]>(
                            response
                        );
                    if (!validated) {
                        return;
                    }

                    this._allEmployees.setValue(
                        validated.results.map((employee, idx) => {
                            return randomApiUserModelToEmployeeModel(
                                employee,
                                idx.toString()
                            );
                        })
                    );
                }),
                finalize(() => this.$allEmployeesIsLoading.next(false))
            )
            .subscribe();
    }
}
