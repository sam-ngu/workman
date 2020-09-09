const {http} = require('./../../src/workman/http');

describe('it will add http middleware', () => {

    it('adds get request', () => {
        http.get('/test', (req, res) => {
            console.log('hello');
        });
    });

})