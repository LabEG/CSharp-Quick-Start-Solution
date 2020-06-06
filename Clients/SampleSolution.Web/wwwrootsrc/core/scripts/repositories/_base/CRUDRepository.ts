import { BaseRepository } from "./BaseRepository";
import { Serializable } from "ts-serializable";
import { Config } from "../../Config";
import {
    PageListQuery, PageListQueryFilter, PageListQueryFilterMethod, PageListQuerySort,
    PageListQuerySortDirection
} from "../../models/ViewModels/PageListQuery";
import { PagedList } from "../../models/ViewModels/PagedList";
import { IGraphQuery } from "../../models/ViewModels/GraphQuery";

type AnyResponse = Object | null | void;

export class CRUDRepository<T1 extends Serializable> extends BaseRepository {

    protected url: string; // example 'api/schoolBuildings'

    protected modelConstructor: new () => T1;

    constructor(url: string, modelConstructor: new () => T1) {
        super();
        this.url = Config.instance.serverUrl + url;
        this.modelConstructor = modelConstructor;
    }

    public async create(value: T1, ...keys: (string | number)[]): Promise<T1> {
        return await this.createByUrl(String(this.url), value, ...keys);
    }

    public async getById(id: string | number, ...keys: (string | number)[]): Promise<T1> {
        return await this.getByUrl(String(`${this.url}{id}`), id, ...keys);
    }

    public async getGraphById(id: string | number, ...keys: (string | number | IGraphQuery)[]): Promise<T1> {
        return await this.getGraphByUrl(String(`${this.url}{id}/graph`), id, ...keys);
    }

    public async getAll(...keys: (string | number)[]): Promise<T1[]> {
        return await this.getListByUrl(String(this.url), ...keys);
    }

    public async getPaged(...keys: (string | number | PageListQuery)[]): Promise<PagedList<T1>> {
        return await this.getPagedByUrl(String(`${this.url}paged`), ...keys);
    }

    public async update(value: T1, ...keys: (string | number)[]): Promise<void> {
        await this.updateByUrl(String(`${this.url}{id}`), value, ...keys);
    }

    public async delete(...keys: (string | number)[]): Promise<void> {
        await this.deleteByUrl(String(`${this.url}{id}`), ...keys);
    }

    protected async createByUrl(url: string, value: T1, ...keys: (string | number)[]): Promise<T1> {
        url = this.parseURL(url, ...keys);
        const data: T1 | AnyResponse = await this.postAsync(url, JSON.stringify(value));
        if (data instanceof Object && !Array.isArray(data)) {
            return new this.modelConstructor().fromJSON(data);
        }
        throw new Error(`CRUDRepository.createByUrl: wrong returned value, must be Object type: ${
            JSON.stringify(data).substring(0, 50)}...`);
    }

    protected async getByUrl(url: string, ...keys: (string | number)[]): Promise<T1> {
        url = this.parseURL(url, ...keys);
        const data: T1 | AnyResponse = await this.getAsync(url);
        if (data instanceof Object && !Array.isArray(data)) {
            return new this.modelConstructor().fromJSON(data);
        }
        throw new Error(`CRUDRepository.getByUrl: wrong returned value, must be Object type: ${
            JSON.stringify(data).substring(0, 50)}...`);
    }

    protected async getGraphByUrl(url: string, ...keys: (string | number | IGraphQuery)[]): Promise<T1> {
        url = this.parseURL(url, ...keys);
        const data: T1 | AnyResponse = await this.getAsync(url);
        if (data instanceof Object && !Array.isArray(data)) {
            return new this.modelConstructor().fromJSON(data);
        }
        throw new Error(`CRUDRepository.getGraphByUrl: wrong returned value, must be Object type: ${
            JSON.stringify(data).substring(0, 50)}...`);
    }

    protected async getListByUrl(url: string, ...keys: (string | number)[]): Promise<T1[]> {
        url = this.parseURL(url, ...keys);
        const data: T1[] | AnyResponse = await this.getAsync(url);
        if (Array.isArray(data)) {
            return data.map((value: T1) => new this.modelConstructor().fromJSON(value));
        }
        throw new Error(`CRUDRepository.getListByUrl: wrong returned value, must be Array type: ${
            JSON.stringify(data).substring(0, 50)}...`);
    }

    protected async getPagedByUrl(url: string, ...keys: (string | number | PageListQuery)[]): Promise<PagedList<T1>> {
        url = this.parseURL(url, ...keys);
        const data: PagedList<T1> | AnyResponse = await this.getAsync(url);
        if (data instanceof Object) {
            const pagedData: PagedList<T1> = new PagedList<T1>().fromJSON(data);
            pagedData.elements = pagedData.elements.map((value: Object) => new this.modelConstructor().fromJSON(value));

            return pagedData;
        }
        throw new Error(`CRUDRepository.getListByUrl: wrong returned value, must be Array type: ${
            JSON.stringify(data).substring(0, 50)}...`);
    }

    protected async updateByUrl(url: string, value: T1, ...keys: (string | number)[]): Promise<void> {
        url = this.parseURL(url, ...keys);
        await this.putAsync(url, JSON.stringify(value));
    }

    protected async deleteByUrl(url: string, ...keys: (string | number)[]): Promise<void> {
        url = this.parseURL(url, ...keys);
        await this.deleteAsync(url);
    }

    protected parseURL(url: string, ...key: (string | number | PageListQuery | IGraphQuery)[]): string {
        url = String(url);
        const matches: RegExpMatchArray | null = url.match(/{[\s\S]+?}/g);

        if (Array.isArray(matches)) {
            let i: number = 0;
            for (i = 0; i < matches.length; i += 1) {
                url = url.replace(matches[i], key[i].toString());
            }
        }

        if (Object.isObject(key[key.length - 1])) {
            const queryParam: PageListQuery = key[key.length - 1] as (PageListQuery | IGraphQuery);
            const params: string[] = [];

            let isPageListQuery: boolean = false;
            if (typeof queryParam.pageNumber === "number") {
                isPageListQuery = true;
                params.push(`pageNumber=${encodeURIComponent(String(queryParam.pageNumber))}`);
            }

            if (typeof queryParam.pageSize === "number") {
                isPageListQuery = true;
                params.push(`pageSize=${encodeURIComponent(String(queryParam.pageSize))}`);
            }

            if (Array.isArray(queryParam.sort) && queryParam.sort.length > 0) {
                isPageListQuery = true;
                const sorts: string[] = queryParam.sort.map((sort: PageListQuerySort) => {
                    let direction: string = "";
                    switch (sort.direction) {
                        case PageListQuerySortDirection.Desc:
                            direction = "desc";
                            break;
                        case PageListQuerySortDirection.Asc:
                        default:
                            direction = "asc";
                            break;
                    }

                    return `${sort.property}~${direction}`;
                });
                params.push(`sort=${encodeURIComponent(sorts.join(","))}`);
            }

            if (Array.isArray(queryParam.filter) && queryParam.filter.length > 0) {
                isPageListQuery = true;
                const filters: string[] = queryParam.filter.map((filter: PageListQueryFilter) => {
                    let method: string = "";
                    switch (filter.method) {
                        case PageListQueryFilterMethod.Less:
                            method = "<";
                            break;
                        case PageListQueryFilterMethod.LessOrEqual:
                            method = "<=";
                            break;
                        case PageListQueryFilterMethod.GreatOrEqual:
                            method = ">=";
                            break;
                        case PageListQueryFilterMethod.Great:
                            method = ">";
                            break;
                        case PageListQueryFilterMethod.Like:
                            method = "like";
                            break;
                        case PageListQueryFilterMethod.ILike:
                            method = "ilike";
                            break;
                        case PageListQueryFilterMethod.Equal:
                        default:
                            method = "=";
                            break;
                    }

                    return `${filter.property}~${method}~${encodeURIComponent(String(filter.value))}`;
                });
                params.push(`filter=${encodeURIComponent(filters.join(","))}`);
            }

            if (Object.isObject(queryParam.graph)) {
                params.push(`graph=${encodeURIComponent(JSON.stringify(queryParam.graph))}`);
            }

            if (!isPageListQuery) {
                params.push(`graph=${encodeURIComponent(JSON.stringify(queryParam))}`);
            }

            url += `?${params.join("&")}`;
        }

        return url;
    }

}
