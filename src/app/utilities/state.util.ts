import { StateProp } from '../models/state-prop.model';

export function initializeStateProp<TProp>(
    defaultValue: TProp,
    localStorageKey: string
) {
    let initialValue = defaultValue;
    try {
        const storageValue = localStorage.getItem(localStorageKey);

        if (typeof storageValue === 'string') {
            initialValue = JSON.parse(storageValue);
        }
    } catch (error) {
        console.error(error);
    }

    return new StateProp(initialValue, localStorageKey);
}
