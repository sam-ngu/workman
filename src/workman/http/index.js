export const http = {
    // each item should look like:
    // {
    //     uri: 'url',
    //     handler: a handler function,
    //     options: an option object, contain generic options for the current url
    // }
    _getHandlers: [],
    _postHandlers: [],
    _patchHandlers: [],
    _deleteHandlers: [],
    _putHandlers: [],

    async handleFetch(event, response) {
        const request = event.request.clone();
        const method = request.method.toLowerCase();
        const url = new URL(request.url);

        // startwith or exact match?
        // allow user to pass in matcher function
        // wildcard?
        // regex?
        // TODO: check for options
        // FIXME: this is only applicable to fetch request
        const handlers = this[`_${method}Handlers`];

        // get the correct handlers array
        if (handlers === undefined) {
            console.log("Unsupported method, relaying request to fetch.");
            return fetch(request);
        }

        const found = this[`_${method}Handlers`].find((handlerObject) => {
            return url.pathname === handlerObject.uri;
        });

        if(found === undefined){
            console.log('undefined url, relaying request to fetch');
            return fetch(request)
        }

        if (request.bodyUsed || response._hasSent) {
            throw new Error("Request body used or response sent. ");
        }

        // pass in req, response
        await found.handler(request, response);

        // get the JS response object
        return response.httpResponse();
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
