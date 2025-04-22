import { TestBed } from '@angular/core/testing';

import { EmployeeService } from './employee.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { RandomUserApiResponse } from '../models/random-user-api-response.model';
import { RandomUserApiUserModel } from '../models/random-user-api-user.model';
import { randomApiUserModelToEmployeeModel } from '../utilities/employee.util';
import { asyncData } from '../utilities/test.util';

const SAMPLE_RANDOM_USER: RandomUserApiUserModel = {
    gender: 'female',
    name: {
        title: 'Miss',
        first: 'Jennie',
        last: 'Nichols',
    },
    location: {
        street: {
            number: 8929,
            name: 'Valwood Pkwy',
        },
        city: 'Billings',
        state: 'Michigan',
        country: 'United States',
        postcode: '63104',
        coordinates: {
            latitude: '-69.8246',
            longitude: '134.8719',
        },
        timezone: {
            offset: '+9:30',
            description: 'Adelaide, Darwin',
        },
    },
    email: 'jennie.nichols@example.com',
    login: {
        uuid: '7a0eed16-9430-4d68-901f-c0d4c1c3bf00',
        username: 'yellowpeacock117',
        password: 'addison',
        salt: 'sld1yGtd',
        md5: 'ab54ac4c0be9480ae8fa5e9e2a5196a3',
        sha1: 'edcf2ce613cbdea349133c52dc2f3b83168dc51b',
        sha256: '48df5229235ada28389b91e60a935e4f9b73eb4bdb855ef9258a1751f10bdc5d',
    },
    dob: {
        date: '1992-03-08T15:13:16.688Z',
        age: 30,
    },
    registered: {
        date: '2007-07-09T05:51:59.390Z',
        age: 14,
    },
    phone: '(272) 790-0888',
    cell: '(489) 330-2385',
    id: {
        name: 'SSN',
        value: '405-88-3636',
    },
    picture: {
        large: 'https://randomuser.me/api/portraits/men/75.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/75.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
    },
    nat: 'US',
};

describe('EmployeeService', () => {
    let service: EmployeeService;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    beforeEach(() => {
        localStorage.setItem(
            'allEmployees',
            JSON.stringify([
                randomApiUserModelToEmployeeModel(SAMPLE_RANDOM_USER),
            ])
        );
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), EmployeeService],
        });
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        service = TestBed.inject(EmployeeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('$allEmployees should return locally stored employees', (done: DoneFn) => {
        service.$allEmployees.subscribe({
            next: (employees) => {
                expect(employees[0].name.first).toEqual(
                    SAMPLE_RANDOM_USER.name.first
                );
                done();
            },
            error: done.fail,
        });
    });

    xit('$allEmployees should return remote employees when reloaded', (done: DoneFn) => {
        const user = SAMPLE_RANDOM_USER;
        user.name.first = 'Austin';

        const response: RandomUserApiResponse<RandomUserApiUserModel[]> = {
            results: [user],
            info: {
                seed: 'abc',
                results: 1,
                page: 1,
                version: '1.0',
            },
        };

        console.log(user.name.first);

        httpClientSpy.get.and.returnValue(asyncData(response));

        service.reloadAllEmployees(false);

        service.$allEmployees.subscribe({
            next: (employees) => {
                expect(employees[0].name.first).toEqual(user.name.first);
                done();
            },
            error: done.fail,
        });
    });
});
