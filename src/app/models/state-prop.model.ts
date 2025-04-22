import { BehaviorSubject, Observable } from 'rxjs';

export class StateProp<TValue> {
    private _$subject: BehaviorSubject<TValue>;
    public $value: Observable<TValue>;

    public get value() {
        return this._$subject.value;
    }

    constructor(
        initialValue: TValue,
        public localStorageKey: string
    ) {
        this._$subject = new BehaviorSubject(initialValue);
        this.$value = this._$subject.asObservable();
    }

    public setValue(value: TValue) {
        this._$subject.next(value);
        localStorage.setItem(this.localStorageKey, JSON.stringify(value));
    }
}
