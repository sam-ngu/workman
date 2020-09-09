import { http } from '../../../src/workman/http'
import {createResponse} from '../../../src/workman/utils/response';
import {eventFactory} from "../../factories/event-factory";
import {urlFactory} from "../../url-factory";


function addHttpTest(method){
    const mockHandler = jest.fn((req,res) => '');

    http[method]('/test', mockHandler);

    expect(http[`_${method}Handlers`].length).toBe(1);

    const event = eventFactory.make('/test', method);
    http.handleFetch(event, createResponse());

    expect(mockHandler.mock.calls.length).toBe(1);
}

describe('Http middleware', () => {

    beforeEach(() => {
        global.URL = urlFactory.make('/test');
        global.fetch = jest.fn(() => Function)
    })

    it('adds get request', () => {
        addHttpTest('get');
    });

    it('adds post request', () => {
        addHttpTest('post');
    });

    it('adds patch request', () => {
        addHttpTest('patch');
    });

    it('adds put request', () => {
        addHttpTest('put');
    });

    it('adds delete request', () => {
        addHttpTest('delete');
    });

})