import {BaseService} from './BaseService';
import {CRUDRepository} from '../../repositories/_base/CRUDRepository';
import {Serializable} from 'ts-serializable';
import {PageListQuery} from '../../models/ViewModels/PageListQuery';
import {PagedList} from '../../models/ViewModels/PagedList';
import {IGraphQuery} from '../../models/ViewModels/GraphQuery';

export class CRUDService<T1 extends Serializable, T2 extends CRUDRepository<T1>> extends BaseService {

    public repository: T2;

    constructor(repository: new () => T2) {
        super();
        this.repository = new repository();
    }

    public async getAll(...keys: (string | number)[]): Promise<T1[]> {
        return await this.repository.getAll(...keys);
    }

    public async create(value: T1, ...key: (string | number)[]): Promise<T1> {
        return await this.repository.create(value, ...key);
    }

    public async getById(id: string | number, ...key: (string | number)[]): Promise<T1> {
        return await this.repository.getById(id, ...key);
    }

    public async getGraphById(id: string | number, ...key: (string | number | IGraphQuery)[]): Promise<T1> {
        return await this.repository.getGraphById(id, ...key);
    }

    public async update(value: T1, ...key: (string | number)[]): Promise<void> {
        return await this.repository.update(value, ...key);
    }

    public async delete(...key: (string | number)[]): Promise<void> {
        return await this.repository.delete(...key);
    }

    public async getPaged(...keys: (string | number | PageListQuery)[]): Promise<PagedList<T1>> {
        return await this.repository.getPaged(...keys);
    }

}
