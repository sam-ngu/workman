import {FetchEvent, Request, Response} from "./service-worker";

interface WorkmanResponse {
    _hasSent: boolean,
    _responseBody: Response,
    httpResponse(): Response,
    json(body: object): void,
}


interface Router {
    get(uri: string, handler: middleware, options: object),
    post(uri: string, handler: middleware, options: object),
    patch(uri: string, handler: middleware, options: object),
    put(uri: string, handler: middleware, options: object),
    delete(uri: string, handler: middleware, options: object),

}


type middleware = (req: Request, res: WorkmanResponse, next: () => Response, event: FetchEvent) => Response

export type {
    WorkmanResponse,
    middleware,
    Router,
}

