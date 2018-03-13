'use strict';
import RouteABC from '../route';

/**
 * UpdateRoute is an Abstract Base Class for a HTTP PUT endpoint.
 */

export class UpdateRoute extends RouteABC {

    static verb() {
        return 'PUT';
    }

    _execute() {
        return this.update();
    }

    static _request(r) {
        return r.put(this.path());
    }

    static _attach(router) {
        super._attach(router);
        router.put(this.path(), super._createRemoteRequest);
    }
}
