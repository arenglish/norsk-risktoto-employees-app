export interface EmployeeModel {
    id: {
        name: string;
        value: string;
    };
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    name: {
        title: string;
        first: string;
        last: string;
    };
    flagged: boolean;
}
