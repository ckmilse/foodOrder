
export type InternalStateType = {
    [key: string]: any
};

let data: InternalStateType = {};

export class DataStore {
    public setValue(prop: string, value: any) {
        return data[prop] = value;
    }

    public getValue(prop: string) {
        return data[prop];
    }
}
