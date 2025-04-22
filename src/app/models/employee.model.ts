export interface EmployeeModel {
    localId: string;
    gender: string;
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
