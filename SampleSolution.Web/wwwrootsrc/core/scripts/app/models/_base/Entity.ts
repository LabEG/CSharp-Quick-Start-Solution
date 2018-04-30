import {jsonProperty, Serializable} from 'ts-serializable';

export class Entity<T> extends Serializable {

    @jsonProperty(Number, String, void 0)
    public id?: T = void 0;

    @jsonProperty(Date)
    public createdTime: Date = new Date();

    @jsonProperty(Date)
    public lastUpdateTime: Date = new Date();
}
