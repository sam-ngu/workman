// export * as sw from './service-worker';


import {WorkmanResponse, RouterInterface} from './workman';

declare function Router(): RouterInterface;

export {
    Router,
    WorkmanResponse,
}
// declare module "workman-sw" {
//     function Router(): RouterInterface
//     export {
//         Router
//     }
// }