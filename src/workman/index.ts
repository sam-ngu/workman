import {createResponse} from "./utils/response";
import type {middleware, WorkmanResponse} from "../types/workman";
import {FetchEvent, Response} from "../types/service-worker";


// config object
/*
* {
*   urls: Array
*
* }
* */
export default (
    eventType: string = "fetch",
    config?: {
        urls: Array<string>
    }
) => {
    const middlewares: Array<middleware> = [];
    const allowableEventListeners = ["fetch"];

    if (!allowableEventListeners.includes(eventType)) {
        throw new Error("Unsupported event " + eventType);
    }

    function runMiddlewares(event: FetchEvent, response: WorkmanResponse): Response {
        const request = event.request.clone();
        const method = request.method.toLowerCase();
        const url = new URL(request.url);

        /**
         * Run the next middleware
         * @param {number} index
         */
        function getNextMiddleware(index: number) {
            return function () {
                if (request.bodyUsed || response._hasSent) {
                    throw new Error("Request body used or response sent. ");
                }
                if (index < middlewares.length) {
                    return middlewares[index](request, response, getNextMiddleware(index + 1), event);
                }

                throw new Error('No more middleware available to run.');

            }
        }

        // only move on to the next middleware if getNextMiddleware() is called
        return getNextMiddleware(0)();

    }

    return {

        use(middleware: middleware) {
            middlewares.push(middleware);
        },

        listen() {

            self.addEventListener(eventType, async (event: FetchEvent) => {

                // only listen to url defined in config
                const matched = config?.urls.every((regex) => event.request.url.match(regex));

                if (!matched) {
                    return;
                }

                // init response object
                const response = createResponse();
                // await initMiddlewares(event, response)

                const result = runMiddlewares(event, response);

                event.respondWith(result);
                console.log('end listen');

            });
        },


    };
};
