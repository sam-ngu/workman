import {FetchEvent, Request, Response} from "./service-worker";

export type middleware = (req: Request, res: WorkmanResponse, next: () => Response, event: FetchEvent) => Response

export interface WorkmanResponse {
    _hasSent: boolean,
    _responseBody: Response,
    httpResponse(): Response,
    json(body: object): void,
}


export interface RouterInterface {
    get(uri: string, handler: middleware, options?: any),
    post(uri: string, handler: middleware, options?: any),
    patch(uri: string, handler: middleware, options?: any),
    put(uri: string, handler: middleware, options?: any),
    delete(uri: string, handler: middleware, options?: any),

}

export interface WorkmanInterface {

}

