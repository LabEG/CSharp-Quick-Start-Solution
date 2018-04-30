
export interface IGraphQueryDeep5 {
    [key: string]: object | null;
}

export interface IGraphQueryDeep4 {
    [key: string]: IGraphQueryDeep5 | null;
}

export interface IGraphQueryDeep3 {
    [key: string]: IGraphQueryDeep4 | null;
}

export interface IGraphQueryDeep2 {
    [key: string]: IGraphQueryDeep3 | null;
}

export interface IGraphQueryDeep1 {
    [key: string]: IGraphQueryDeep2 | null;
}

export interface IGraphQuery {
    [key: string]: IGraphQueryDeep1 | null;
}
