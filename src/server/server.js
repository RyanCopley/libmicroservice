'use strict';
import Morgan from 'morgan';
import Express from 'express';
import BodyParser from 'body-parser';
import { Environment } from './environment';

/** Server represents an HTTP server. */
class Server {
    /**
     * Creates a Server.
     */
    constructor() {
        this.app = Express();
    }

    /**
     *
     * @returns {*|express}
     */
    get express() {
        return this.app;
    }

    /**
     *
     * @param middlewares
     */
    importMiddlewares(middlewares) {
        middlewares.forEach(m => this.app.use(m));
    }

    /**
     *
     * @param router
     */
    importRouter(router) {
        this.app.use(router);
    }

    /**
     *
     * @param routes
     */
    importRoutes(routes) {
        const router = Express.Router();

        for (let route of routes) {
            route._attach(router);
        }
        this.importRouter(router);
    }

    /**
     * Starts HTTP listening
     * @param {number} port The port to listen on. Recommended to be above 1000.
     * @param {string} address The IP address to listen on. Recommended to be 0.0.0.0.
     */
    listen(...params) {
        if (Environment.isLocal()) {
            this.app.use(Morgan('dev'));
            console.log(`Listening on on port ${params[0]}`);
        }
        this._configureMiddlewares();
        this._configureRoutes();
        this.app.listen(...params);
    }

    /**
     * Handles middleware installation logic.
     * @private
     */
    _configureMiddlewares() {
        this.app.use(BodyParser.json());
    }

    /**
     * Handles route installation logic.
     * @private
     */
    _configureRoutes() {
        this.app.use((req, res) => this._missingRouteHandler(req, res));
        this.app.use((err, req, res, next) => this._errorHandler(err, req, res, next));
    }

    /**
     * If the route is not defined by any router, this route is performed. The request is over.
     * @param req - The request object.
     * @param res - The response object.
     * @private
     */
    _missingRouteHandler(req, res) {
        res.status(400).end();
    }

    /**
     * If a route throws an error, this handler is performed. The request is over.
     * @param error - The error that was thrown by a route.
     * @param req - The request object.
     * @param res - The response object.
     * @private
     */
    _errorHandler(error, req, res) {
        res.status(500).json({ error : error.public || error.message });
        if (Environment.isLocalOrTesting()) {
            console.log(error);
        }
    }
}

export default Server;