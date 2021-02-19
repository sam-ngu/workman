
// @ts-ignore
export function createResponse(event: FetchEvent): WorkmanResponse {
    return {
        _hasSent: false,
        _responseBody: new Response(),
        /**
         *
         * @param {Object} body 
         */
        json( body: object): void{
            this._hasSent = true;
            this._responseBody = new Response(JSON.stringify(body));
        },

        httpResponse(): Response{
            return this._responseBody
        }
    }
    
}