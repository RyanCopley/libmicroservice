'use strict';

import Server from './server';

const HTTP_PORT_DEFAULT = 3000;
const HTTP_ADDR_DEFAULT = '0.0.0.0';

export { CreateRoute } from './abc/route/create';
export { DeleteRoute } from './abc/route/delete';
export { ReadRoute } from './abc/route/read';
export { UpdateRoute } from './abc/route/update';
export { Environment } from './environment';
export { Schema } from './schema';

export default class libmicroservice {
    start(params) {
        const HTTP_PORT = params.port || process.env.PORT || HTTP_PORT_DEFAULT;
        const HTTP_ADDR = params.address || process.env.HTTP_ADDR || HTTP_ADDR_DEFAULT;

        const server = new Server();
        params.middlewares ? server.importMiddlewares(params.middlewares) : null;
        params.routes ? server.importRoutes(params.routes) : null;
        server.listen(HTTP_PORT, HTTP_ADDR);
        return server;
    }
}