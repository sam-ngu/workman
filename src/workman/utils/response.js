export const createResponse = function(event) {
    return {
        _hasSent: false,
        _responseBody: new Response(),
        /**
         *
         * @param {Object} body 
         */
        json( body){
            this._hasSent = true;


            this._responseBody = new Response(JSON.stringify(body));

        },

        httpResponse(){
            return this._responseBody
        }
    }
    
}