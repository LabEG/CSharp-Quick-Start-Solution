import { jsonProperty, Serializable } from "ts-serializable";

export class PageMeta extends Serializable {

    @jsonProperty(Number)
    public pageNumber: number = 0;

    @jsonProperty(Number)
    public pageSize: number = 0;

    @jsonProperty(Number)
    public elementsInPage: number = 0;

    @jsonProperty(Number)
    public totalPages: number = 0;

    @jsonProperty(Number)
    public totalElements: number = 0;

}
