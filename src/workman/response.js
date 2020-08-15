export const createResponse = function() {
    return {
        _hasSent: false,
        /**
         * 
         * @param {Event} event 
         * @param {Object} body 
         */
        json(event, body){
            this._hasSent = true;
            const res = new Response(JSON.stringify(body));
            return event.respondWith(res);
        },
    }
    
}