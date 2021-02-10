import {createResponse} from "./utils/response";


// config object
/*
* {
*   urls: Array
*
* }
* */
export default (
    eventType = "fetch",
    config?: {
        urls: Array<string>
    }
) => {
    const middlewares = [];
    const allowableEventListeners = ["fetch"];

    if (!allowableEventListeners.includes(eventType)) {
        throw new Error("Unsupported event " + eventType);
    }

    function runMiddlewares(event, response) {
        const request = event.request.clone();
        const method = request.method.toLowerCase();
        const url = new URL(request.url);

        /**
         * Run the next middleware
         * @param {Number} index
         */
        function getNextMiddleware(index) {
            return function () {
                if (request.bodyUsed || response._hasSent) {
                    throw new Error("Request body used or response sent. ");
                }
                if (index < middlewares.length) {
                    return middlewares[index](request, response, getNextMiddleware(index + 1), event);
                }
            }
        }

        // only move on to the next middleware if getNextMiddleware() is called
        return getNextMiddleware(0)();

    }

    return {

        use(middleware) {
            middlewares.push(middleware);
        },

        listen() {
            // @ts-ignore
            self.addEventListener(eventType, async (event: FetchEvent) => {

                // only listen to url defined in config
                const matched = config?.urls.every((regex) => event.request.url.match(regex));

                if (!matched) {
                    return;
                }

                // init response object
                const response = createResponse(event);
                // await initMiddlewares(event, response)

                const result = runMiddlewares(event, response);

                event.respondWith(result);
                console.log('end listen');

            });
        },


    };
};
