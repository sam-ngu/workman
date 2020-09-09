import Router from './../../src/workman/router';
import workman from './../../src/workman';


describe('Router CRUD test', () => {
    it('should be able to accept get request', () => {
        const router = Router();



        router.get('/test', (req, res) => {

        });

        const app = workman();

        app.use(router);



        expect(router)

    })
})