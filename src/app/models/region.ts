import { observable } from 'mobx-angular';

export class Region {
    @observable
    public name: string;

    public static load(data: Partial<Region>) {
        const result = new Region();
        result.name = data.name;
        return result;
    }
}
