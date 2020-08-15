import { createResponse } from "./response";

export default (eventType = "fetch") => {
    const middlewares = [];
    const allowableEventListeners = ["fetch"];

    if (!allowableEventListeners.includes(eventType)) {
        throw new Error("Unsupported event " + eventType);
    }

    function runMiddlewares(event) {
        const request = event.request.clone();
        const method = request.method.toLowerCase();
        const url = new URL(request.url);

        const response = createResponse();
        
        /**
         * Run the next middleware
         * @param {Number} index 
         */
        const getNextMiddleware = function(index){
            return function(){
                if(request.bodyUsed || response._hasSent){
                    throw new Error("Request body used or response sent. ");
                }
                if(index < middlewares.length){
                    return middlewares[index](request, response, getNextMiddleware(index + 1))
                }
            }
        };

        // only move on to the next middleware if getNextMiddleware() is called
        getNextMiddleware(index)();
        
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
                runMiddlewares(event);

                // startwith or exact match?
                // allow user to pass in matcher function
                // wildcard?
                // regex?
                // TODO: check for options
                // FIXME: this is only applicable to fetch request
                const handlers = this[`_${event.request.method}Handler`];

                // get the correct handlers array
                if (handlers === undefined) {
                    console.log("Unsupported method, relaying request to fetch.");
                    event.respondWith(fetch(request));
                    return;
                }

                const found = this._getHandlers.find((handlerObject) => {
                    return url.pathname === handlerObject.uri;
                });

            });
        },

        get(uri, handler, options) {
            this.use((req, res, next) => {

            })
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
};
