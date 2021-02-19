import {parseUrlParams} from "../../../src/workman/utils/url-parser/url-parser";

describe('test url parser', () => {

    describe('parse the correct dynamic url param', () => {

        it('parse /api/v1/trades/:id/:name', () => {
            const template = '/api/v1/trades/:id/:name';

            const actual = '/api/v1/trades/2/hey';

            // mock Request?

            const parsed = parseUrlParams(template, actual);

            expect(parsed.id).toBe(2);
            expect(parsed.name).toBe('hey');

        })


    })

})