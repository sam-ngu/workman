import {WorkmanResponse} from "../../types/workman";



export function createResponse(): WorkmanResponse {
    return {
        _hasSent: false,
        // @ts-ignore
        _responseBody: new Response(),

        /**
         *
         * @param {Object} body 
         */
        json( body: object): void{
            this._hasSent = true;
            this._responseBody = new Response(JSON.stringify(body));
        },
        // @ts-ignore
        httpResponse(): Response{
            return this._responseBody
        }
    }
    
}