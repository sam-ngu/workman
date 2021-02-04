export const createResponse = function(event) {
    return {
        _hasSent: false,
        /**
         *
         * @param {Object} body 
         */
        json( body){
            this._hasSent = true;
            const res = new Response(JSON.stringify(body));
            return event.respondWith(res);
        },
    }
    
}