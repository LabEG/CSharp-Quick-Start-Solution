import {PageMeta} from './PageMeta';
import {jsonProperty, Serializable} from 'ts-serializable';

export class PagedList<TEntity> extends Serializable {

    @jsonProperty(PageMeta)
    public pageMeta: PageMeta = new PageMeta();

    @jsonProperty([Object])
    public elements: TEntity[] = [];
}
