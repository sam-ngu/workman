import { http as Http } from './../http';

import {FetchEvent, Response} from "../../types/service-worker";
import {RouterInterface, WorkmanResponse} from "../../types/workman";

export default function(): RouterInterface{


    async function router (req: Request, res: WorkmanResponse, next: Function, event: FetchEvent): Promise<Response>{
        // this is meant to handle http requests only
        if(event.request.destination !== 'fetch'){
            return next();
        }
        // returning a http response
        return Http.handleFetch(event, res);

    }

    // const methods = ['get', 'post', 'patch', 'delete', 'put'];
    //
    // for (let i = 0; i < methods.length; i++) {
    //     const method = methods[i];
    //     router[method] = function(uri, handler, options){
    //         Http[method](uri, handler, options);
    //     };
    // }

    // need these to enable autocompleting TODO: convert everything to typescript??
    router.get = Http.get;

    router.post = Http.post;

    router.patch = Http.patch;

    router.delete = Http.delete;

    router.put = Http.put;

    return router;
}

