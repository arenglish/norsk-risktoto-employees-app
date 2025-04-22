import { hasProp } from './object.util';
import { RandomUserApiUserModel } from '../models/random-user-api-user.model';
import { EmployeeModel } from '../models/employee.model';

export function getEmployeeFullName(employeeName: unknown) {
    if (typeof employeeName !== 'object' || employeeName === null) {
        return '';
    }
    let fullname = '';
    if (hasProp(employeeName, 'first') && hasProp(employeeName, 'last')) {
        fullname = `${employeeName.first} ${employeeName.last}`;
    }

    if (hasProp(employeeName, 'title')) {
        fullname = `${employeeName.title} ${fullname}`;
    }

    return fullname.trim();
}

export function randomApiUserModelToEmployeeModel(
    user: RandomUserApiUserModel,
    id?: string
): EmployeeModel {
    const localId = id ?? crypto.randomUUID();
    return {
        flagged: false,
        localId,
        name: user.name,
        picture: user.picture,
        gender: user.gender,
    };
}
