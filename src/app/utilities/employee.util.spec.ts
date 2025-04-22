import { getEmployeeFullName } from './employee.util';
import { EmployeeModel } from '../models/employee.model';

describe('EmployeeUtil', () => {
    describe('getEmployeeFullName()', () => {
        const testCases = [null, undefined, '', 'hello'];

        testCases.forEach((testCase) => {
            it(`should return an empty string for input value ${testCase}`, () => {
                expect(getEmployeeFullName(testCase)).toEqual('');
            });
        });

        const testCasesValidInput: [EmployeeModel['name'], string][] = [
            [
                {
                    first: 'Bob',
                    last: 'English',
                    title: 'Mr.',
                },
                'Mr. Bob English',
            ],
            [
                {
                    first: 'Lucy',
                    last: 'Coleman',
                    title: 'Mrs.',
                },
                'Mrs. Lucy Coleman',
            ],
            [
                {
                    first: 'Janet',
                    last: 'Jackson',
                    title: '',
                },
                'Janet Jackson',
            ],
        ];

        testCasesValidInput.forEach((testCase) => {
            it(`should return valid result for valid input`, () => {
                expect(getEmployeeFullName(testCase[0])).toEqual(testCase[1]);
            });
        });
    });
});
