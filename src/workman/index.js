export function workman(eventType = "fetch") {
    const middlewares = [];

    function runMiddlewares() {
        for (let index = 0; index < middlewares.length; index++) {
            const middleware = middlewares[index];
            middleware();
        }
    }

    return {
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

        use(middleware) {
            middlewares.push(middleware);
        },

        listen() {
            self.addEventListener(eventType, async (event) => {
                runMiddlewares()
                const request = event.request.clone();
                const method = request.method.toLowerCase();
                const url = new URL(request.url);
                if(method === 'get'){

                    // startwith or exact match? 
                    // allow user to pass in matcher function
                    // wildcard?
                    // regex?

                    const found = this._getHandlers.find((handlerObject) => {
                        return url.pathname === handlerObject.uri
                    })
                    
                }
            });
        },

        get(uri, handler, options) {
            this._getHandlers.push({uri, handler, options })
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
}
