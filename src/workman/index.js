import { createResponse } from "./utils/response";

export default (eventType = "fetch") => {
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
        const getNextMiddleware = function(index){
            return function(){
                if(request.bodyUsed || response._hasSent){
                    throw new Error("Request body used or response sent. ");
                }
                if(index < middlewares.length){
                    return middlewares[index](request, response, getNextMiddleware(index + 1), event);
                }
            }
        };

        // only move on to the next middleware if getNextMiddleware() is called
        getNextMiddleware(index)();
        
    }

    return {

        use(middleware) {
            middlewares.push(middleware);
        },

        listen() {
            self.addEventListener(eventType, async (event) => {
                // init response object
                const response = createResponse();

                runMiddlewares(event, response);

                if(eventType.toLowerCase() === 'fetch'){
                    this.handleFetch(event, response)
                }
            });
        },

       
    };
};
