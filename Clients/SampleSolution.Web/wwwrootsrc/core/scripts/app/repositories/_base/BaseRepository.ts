export interface INetError extends Error {
    status: number;
    body: string;
}

type RequestCredentials = 'omit' | 'same-origin' | 'include';

export class BaseRequestInit implements RequestInit {
    public method: string;
    public credentials: RequestCredentials; // 'omit' | 'same-origin' | 'include';
    public body?: Blob | FormData | string | null;
    public headers?: Headers | string[][];

    constructor(method?: string,
                body?: Blob | FormData | string | null,
                headers?: Headers | string[][],
                credentials?: RequestCredentials) {

        this.method = method || 'GET';
        this.body = body !== void 0 ? body : void 0;
        this.headers = headers !== void 0 ? headers : void 0;
        this.credentials = credentials || ('include' as RequestCredentials);

    }
}

export class BaseRepository {

    protected async getAsync(url: string, init?: RequestInit): Promise<Object | number | string | null | void> {
        let response: Response = await fetch(
            url,
            init || JSON.parse(JSON.stringify(new BaseRequestInit('GET'))) // parse/stringify for safary, because safary is shit
        );
        response = await this.handleError(response);

        return response.json();
    }

    protected async postAsync(url: string, data: Object, init?: RequestInit): Promise<Object
        | number
        | string
        | null
        | void> {
        let response: Response = await fetch(
            url,
            init || new BaseRequestInit('POST', JSON.stringify(data), [['Content-Type','application/json']])
        );
        response = await this.handleError(response);

        return response.json();
    }

    protected async putAsync(url: string, data: Object, init?: RequestInit): Promise<void> {
        const response: Response = await fetch(
            url,
            init || new BaseRequestInit('PUT', JSON.stringify(data), [['Content-Type','application/json']])
        );
        await this.handleError(response);
    }

    protected async deleteAsync(url: string, init?: RequestInit): Promise<void> {
        const response: Response = await fetch(
            url,
            init || JSON.parse(JSON.stringify(new BaseRequestInit('DELETE')))
        );
        await this.handleError(response);
    }

    protected async handleError(response: Response): Promise<Response> {

        if (response.ok) {
            return response;
        } else {

            const body: string = await response.text();
            let error: Error;

            if (body.indexOf('{"message":"') === 0) { // backend json response
                error = new Error(body.substring(12, body.length - 2));

            } else if (body.indexOf('<') === 0) { // java xml response
                const match: RegExpMatchArray | null = /<b>description<\/b> <u>(.+?)<\/u>/g.exec(body);
                error = new Error(response.status + ' - ' + (match && match[1] || response.statusText || 'Ошибка не указана'));

            } else {
                error = new Error(response.status + ' - ' + response.statusText);
            }

            error.name = 'NetError';

            // extends Error object
            Object.defineProperty(
                error,
                'status',
                {
                    value: response.status
                }
            );

            // extends Error object
            Object.defineProperty(
                error,
                'body',
                {
                    value: body
                }
            );

            throw error;
        }
    }
}
