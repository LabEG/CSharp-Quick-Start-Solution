import { IGraphQuery } from "./GraphQuery";

export enum PageListQueryFilterMethod {
    Less,
    LessOrEqual,
    Equal,
    GreatOrEqual,
    Great,
    Like,
    ILike
}

export class PageListQueryFilter {

    public property: string = "";

    public method?: PageListQueryFilterMethod = PageListQueryFilterMethod.Equal;

    public value: string | number = "";

    constructor(property: string, value: string | number, method: PageListQueryFilterMethod = PageListQueryFilterMethod.Equal) {
        this.property = property;
        this.method = method;
        this.value = value;
    }

}

export enum PageListQuerySortDirection {
    Asc,
    Desc
}

export class PageListQuerySort {

    public property: string = "";

    public direction?: PageListQuerySortDirection = PageListQuerySortDirection.Asc;

    constructor(property: string, direction: PageListQuerySortDirection = PageListQuerySortDirection.Asc) {
        this.property = property;
        this.direction = direction;
    }

}

export class PageListQuery {

    public pageNumber?: number = 0;

    public pageSize?: number = 0;

    public filter?: PageListQueryFilter[] = [];

    public sort?: PageListQuerySort[] = [];

    public graph?: IGraphQuery = void 0;

}
