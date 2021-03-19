"use strict";
exports.__esModule = true;
exports.createResponse = void 0;
function createResponse() {
    return {
        _hasSent: false,
        // @ts-ignore
        _responseBody: new Response(),
        /**
         *
         * @param {Object} body
         */
        json: function (body) {
            this._hasSent = true;
            this._responseBody = new Response(JSON.stringify(body));
        },
        // @ts-ignore
        httpResponse: function () {
            return this._responseBody;
        }
    };
}
exports.createResponse = createResponse;
