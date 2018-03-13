'use strict';

import { Environment } from '../environment';
import RequestSchemaError from '../error/req/schema';
import ResponseSchemaError from '../error/res/schema';
import PathToRegExp from 'path-to-regexp';
import superagent from 'superagent';
import url from 'url';
import QueryString from 'querystring';
// import RPCError from '../error/req/rpc';

/**
 * RouteABC is an Abstract Base Class for any Express route setup.
 */

class RouteABC {

    // GET
    read() {
        throw new Error('Read Route does not have an implementation.');
    }

    // POST
    create() {
        throw new Error('Create Route does not have an implementation.');
    }

    // PUT
    update() {
        throw new Error('Update Route does not have an implementation.');
    }

    // DELETE
    delete() {
        throw new Error('Delete Route does not have an implementation.');
    }

    // Express request (req)
    request(){
        return this.express.req;
    }

    // Express response (res)
    response() {
        return this.express.res;
    }


    static path() {
        throw new Error('Route Path not set.');
    }

    static verb () {
        throw new Error('Route Verb not set.');
    }

    static requestSchema() {
        throw new Error('Route request schema not set.');
    }

    responseSchema() {
        throw new Error('Route response schema not set.');
    }

    _execute() {
        throw new Error('Route request method not set.');
    }

    static _validateRequest(req) {
        const RequestSchema = this.requestSchema();
        const validator = RequestSchema.Validator();
        if (validator(req)) {
            return true;
        }
        throw new RequestSchemaError(validator.errors);
    }

    static _createRemoteRequest(...i) {
        this._validateRequest(...i);
        const instance = this.instantiate();
        instance._transferExpress(...i);
        instance._execute();
    }

    static rpc(req, cb) {
        // Perform schema validation client side first, since we have their request models available.
        this._validateRequest(req);
        // Begin forming URL
        const requestUrl = new url.URL(`${this.compilePath(req.param)}?${QueryString.stringify(req.query)}`, this.dns().baseUrl()); // req.query = QSPs
        // Begin constructing RPC request
        const request = superagent.get(requestUrl.href);
        for (let key in req.headers) { request.set(key, req.headers[key]); } // req.headers = headers
        request.send(req.body); // req.body = request body
        request.end(cb); // Perform the RPC call
    }

    static compilePath(params) {
        if (!this.compiledPath){
            this.compiledPath = PathToRegExp.compile(this.path());
        }
        return this.compiledPath(params);
    }

    validatedJson(data, res) {
        const ResponseSchema = this.responseSchema();
        const validator = ResponseSchema.Validator();
        if (validator(data)) {
            return res.json(data);
        }
        throw new ResponseSchemaError(validator.errors);
    }

    _transferExpress(req, res, next) {
        res.validatedJson = d => this.validatedJson(d, res);
        this.express = { req, res, next };
    }

    static _request() {
        throw new Error('Route request method not set. Required for proper testing.');
    }

    static _attach() {
        if (Environment.isLocalOrTesting()){
            console.log(`Attaching route: ${this.toString()}`);
        }
    }

    static dns() {
        throw new Error('DNS entry for route was not set. Required for RPC.');
    }

    static _test() {
        if (false === Environment.isLocal()) {
            throw new Error('Routes must have tests.');
        }
    }

    static toString() {
        return `${this.verb()} ${this.path()}`;
    }

}
export default RouteABC;
