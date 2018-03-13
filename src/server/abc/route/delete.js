'use strict';
import RouteABC from '../route';

/**
 * DeleteRoute is an Abstract Base Class for a HTTP DELETE endpoint.
 */

export class DeleteRoute extends RouteABC {

    static verb() {
        return 'DELETE';
    }

    _execute() {
        return this.delete();
    }

    static _request(r) {
        return r.delete(this.path());
    }

    static _attach(router) {
        super._attach(router);
        router.delete(this.path(), (...i) => super._createRemoteRequest(...i));
    }

}
