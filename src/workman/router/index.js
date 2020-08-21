import { http } from './../http';

export default function(){

    const Http = http;

    const router = function (req, res, next, event){
        // this is meant to handle http requests only
        if(!event.destination === 'fetch'){
            next()
        }
        Http.handleFetch(event, res);
    }

    router.get = function(uri, handler, options){
        Http.get(uri, handler, options);
    };

    router.post = function (uri, handler, options) {
        Http.post(uri, handler, options);
    };

    router.patch = function (uri, handler, options) {
        Http.patch(uri, handler, options);
    };

    router.delete = function (uri, handler, options) {
        Http.delete(uri, handler, options);
    };

    return router;
}

