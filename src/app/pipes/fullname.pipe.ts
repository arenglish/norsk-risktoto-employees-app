import { Pipe, PipeTransform } from '@angular/core';
import { hasProp } from '../utilities/object.util';

@Pipe({
    name: 'fullname',
})
export class FullnamePipe implements PipeTransform {
    transform(value: unknown, ...args: unknown[]): unknown {
        if (typeof value !== 'object' || value === null) {
            return '';
        }

        let fullname = '';
        if (hasProp(value, 'first') && hasProp(value, 'last')) {
            fullname = `${value.first} ${value.last}`;
        }

        if (hasProp(value, 'title')) {
            fullname = `${value.title} ${fullname}`;
        }

        return fullname;
    }
}
