import { hasProp } from './object.util';
import { RandomUserApiResponse } from '../models/random-user-api-response.model';

export function validateRandomUserApiResponse<TResults>(
    response: unknown | RandomUserApiResponse<TResults>
): false | RandomUserApiResponse<TResults> {
    if (typeof response !== 'object' || response === null) {
        return false;
    }
    if (!hasProp(response, 'results')) {
        return false;
    }

    return response as RandomUserApiResponse<TResults>;
}
