import { Pipe, PipeTransform } from '@angular/core';
import { getEmployeeFullName } from '../utilities/employee.util';

@Pipe({
    name: 'fullname',
})
export class FullnamePipe implements PipeTransform {
    transform(value: unknown, ...args: unknown[]): unknown {
        return getEmployeeFullName(value);
    }
}
