import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesComponent } from './employees.component';
import { EmployeeService } from '../../services/employee.service';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('EmployeesComponent', () => {
    let component: EmployeesComponent;
    let fixture: ComponentFixture<EmployeesComponent>;

    const employeeServiceSpy = jasmine.createSpyObj('EmployeesService', {
        reloadAllEmployees: () => {},
    });
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EmployeesComponent],
            providers: [
                {
                    provide: EmployeeService,
                    useValue: employeeServiceSpy,
                },
                provideHttpClient(),
                provideRouter([]),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(EmployeesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('onReloadEmployeesButtonClicked()', () => {
        it('should call employeeService.reloadAllEmployees(false)', () => {
            component.onReloadEmployeesButtonClicked();
            expect(employeeServiceSpy.reloadAllEmployees.calls.count())
                .withContext('one call')
                .toBe(1);
        });
    });
});
