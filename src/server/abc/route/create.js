'use strict';
import RouteABC from '../route';

/**
 * CreateRouteABC is an Abstract Base Class for a HTTP POST endpoint.
 */

export class CreateRoute extends RouteABC {

    static verb() {
        return 'POST';
    }

    _execute() {
        return this.create();
    }

    static _request(r) {
        return r.post(this.path());
    }

    static _attach(router) {
        super._attach(router);
        router.post(this.path(), (...i) => this._createRemoteRequest(...i));
    }

}
