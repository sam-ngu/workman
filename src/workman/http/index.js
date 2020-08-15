export const http = {
    // each item should look like:
    // {
    //     uri: 'url',
    //     handler: a handler function,
    //     options: an option object
    // }
    _getHandlers: [],
    _postHandlers: [],
    _patchHandlers: [],
    _deleteHandlers: [],
    _putHandlers: [],

    handleFetch(event, response) {
        const request = event.request.clone();
        const method = request.method.toLowerCase();
        const url = new URL(request.url);

        // startwith or exact match?
        // allow user to pass in matcher function
        // wildcard?
        // regex?
        // TODO: check for options
        // FIXME: this is only applicable to fetch request
        const handlers = this[`_${method}Handler`];

        // get the correct handlers array
        if (handlers === undefined) {
            console.log("Unsupported method, relaying request to fetch.");
            event.respondWith(fetch(request));
            return;
        }

        const found = this[`_${method}Handlers`].find((handlerObject) => {
            return url.pathname === handlerObject.uri;
        });

        if(found === -1){
            console.log('undefined url, relaying request to fetch');
            event.respondWith(fetch(request));
            return;
        }

        if (request.bodyUsed || response._hasSent) {
            throw new Error("Request body used or response sent. ");
        }

        // pass in req, response
        found.handler(request, response)

    },

    get(uri, handler, options) {
        this._getHandlers.push({ uri, handler, options });
    },

    post(uri, handler, options) {
        this._postHandlers.push({ uri, handler, options });
    },

    patch(uri, handler, options) {
        this._patchHandlers.push({ uri, handler, options });
    },

    put(uri, handler, options) {
        this._putHandlers.push({ uri, handler, options });
    },

    delete(uri, handler, options) {
        this._deleteHandlers.push({ uri, handler, options });
    },
};
