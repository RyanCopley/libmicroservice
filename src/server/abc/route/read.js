'use strict';
import RouteABC from '../route';

/**
 * ReadRoute is an Abstract Base Class for a HTTP GET endpoint.
 */

export class ReadRoute extends RouteABC {

    static verb() {
        return 'GET';
    }

    _execute() {
        return this.read();
    }

    static _request(r) {
        return r.get(this.path());
    }

    static _attach(router) {
        super._attach(router);
        router.get(this.path(), (...i) => this._createRemoteRequest(...i));
    }

}
