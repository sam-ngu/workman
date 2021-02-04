import { http as Http } from './../http';

export default function(){

    function router (req, res, next, event){
        // this is meant to handle http requests only
        if(!event.destination === 'fetch'){
            next()
        }
        Http.handleFetch(event, res);
    }

    // const methods = ['get', 'post', 'patch', 'delete', 'put'];

    // for (let i = 0; i < methods; i++) {
    //     const method = methods[i];
    //     router[method] = function(uri, handler, options){
    //         Http[method](uri, handler, options);
    //     };
    // }

    // need these to enable autocompleting TODO: convert everything to typescript??
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

    router.put = function (uri, handler, options){
        Http.put(uri, handler, options);
    };

    return router;
}

